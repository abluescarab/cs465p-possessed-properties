import { FastifyInstance } from "fastify";
import { Offer } from "../db/entities/Offer.js";
import { error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import { Listing } from "../db/entities/Listing.js";
import verifyToken from "../firebase/verify_token.js";

export function createOfferRoutes(app: FastifyInstance) {
  // region GET - get all offers
  app.get("/offers", async (request) => {
    return request.em.find(Offer, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find an offer
  app.search<{
    Body: {
      buyer_email?: string;
      listing_name?: string;
      price?: number;
      filter_deleted?: boolean;
    };
  }>("/offers", async (request, reply) => {
    const data = {};
    const { buyer_email, listing_name, price, filter_deleted } = request.body;
    let listings = null;

    // TODO: populate offer listing
    try {
      if (buyer_email !== undefined) {
        const { success, entity: buyer } = await find(
          request,
          reply,
          User,
          {
            email: buyer_email,
          },
          { filterDeleted: filter_deleted }
        );

        if (success) {
          data["buyer"] = buyer;
        } else {
          return error(reply, HttpStatus.NOT_FOUND, "No offers found");
        }
      }

      if (listing_name !== undefined) {
        listings = await request.em.find(Listing, { name: listing_name });

        if (listings.length === 0) {
          return error(reply, HttpStatus.NOT_FOUND, "No offers found");
        }
      }

      if (price !== undefined) {
        data["price"] = price;
      }

      let offers = [];

      if (listings?.length > 0) {
        for (const listing of listings) {
          const dataListing = Object.assign({}, { listing }, data);
          offers = offers.concat(await request.em.find(Offer, dataListing));
        }
      } else {
        offers = await request.em.find(Offer, data);
      }

      if (offers.length === 0) {
        return error(reply, HttpStatus.NOT_FOUND, `No offers found`);
      }

      app.log.info(offers);
      return reply.send(offers);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region POST - create an offer
  app.post<{
    Body: {
      token: string;
      uid: string;
      listing_id: number;
      price: number;
    };
  }>("/offers", async (request, reply) => {
    const { token, uid, listing_id, price } = request.body;

    try {
      const user = verifyToken(token, uid);

      if (!user) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          "Invalid user authentication token"
        );
      }

      const buyer = await find(
        request,
        reply,
        User,
        { email: user.email },
        { errorMessage: `User with email ${user.email} not found` }
      );

      if (!buyer.success) {
        return reply;
      }

      const listing = await find(
        request,
        reply,
        Listing,
        { id: listing_id },
        { errorMessage: `Listing with ID ${listing_id} not found` }
      );

      if (!listing.success) {
        return reply;
      }

      const offer = await request.em.create(Offer, {
        buyer: buyer.entity,
        listing: listing.entity,
        price,
      });

      await request.em.flush();

      app.log.info(offer);
      return reply.send(offer);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region PUT - update an offer
  app.put<{
    Body: {
      token: string;
      uid: string;
      id: number;
      price?: number;
      status?: string;
    };
  }>("/offers", async (request, reply) => {
    const { token, uid, id, price, status } = request.body;

    try {
      const authenticated = verifyToken(token, uid);

      if (!authenticated) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          "Invalid user authentication token"
        );
      }

      // TODO: ensure specified user owns offer
      const { success, entity: offer } = await find(
        request,
        reply,
        Offer,
        { id },
        { errorMessage: `Offer with ID ${id} not found` }
      );

      if (!success) {
        return reply;
      }

      if (offer.closed_at !== null) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `Offer with ID ${id} has been accepted and is not modifiable`
        );
      }

      if (price !== undefined) {
        offer.price = price;
      }

      if (offer.status !== status) {
        offer.status = status;
      }

      if (offer.status !== "open") {
        offer.closed_at = new Date();
      }

      await request.em.flush();
      app.log.info(offer);
      return reply.send(offer);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region DELETE - mark an offer as deleted
  app.delete<{ Body: { token: string; uid: string; id: number } }>(
    "/offers",
    async (request, reply) => {
      const { token, uid, id } = request.body;

      // TODO: ensure user owns offer
      try {
        const user = verifyToken(token, uid);

        if (!user) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            "Invalid user authentication token"
          );
        }

        const { success, entity: offer } = await find(
          request,
          reply,
          Offer,
          { id },
          { errorMessage: `Offer with ID ${id} not found` }
        );

        if (!success) {
          return reply;
        }

        if (offer.closed_at !== null) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `Offer with ID ${id} has been accepted and is not modifiable`
          );
        }

        await request.em.remove(offer);
        await request.em.flush();

        app.log.info(offer);
        return reply.send(offer);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
  // endregion
}
