import { FastifyInstance } from "fastify";
import { Offer } from "../db/entities/Offer.js";
import { createBody, error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import { Listing } from "../db/entities/Listing.js";
import verifyToken from "../firebase/verify_token.js";
import { OfferStatus } from "../types.js";

export function createOfferRoutes(app: FastifyInstance) {
  // region GET - get all offers
  app.get("/offers", async (request) => {
    return request.em.find(Offer, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find an offer
  app.search<{
    Body: {
      id?: number;
      buyerId?: number;
      listingId?: number;
      price?: number;
      status?: OfferStatus;
      filterDeleted?: boolean;
      populate?: string[];
    };
  }>("/offers", async (request, reply) => {
    const data = createBody(request.body, ["id", "filterDeleted", "populate"]);

    const { id, filterDeleted, populate } = request.body;

    try {
      if (id !== undefined) {
        const { success, entity: offer } = await find(
          request,
          reply,
          Offer,
          { id },
          {
            errorMessage: `Offer with ID ${id} not found`,
            populate,
            filterDeleted,
          }
        );

        if (!success) {
          return reply;
        }

        app.log.info(offer);
        return reply.send(offer);
      }

      const offers = await request.em.find(Offer, data, { populate });

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
      listingId: number;
      price: number;
    };
  }>("/offers", async (request, reply) => {
    const { token, uid, listingId, price } = request.body;

    try {
      const authUser = verifyToken(token, uid);

      const buyer = await find(
        request,
        reply,
        User,
        { email: authUser.email },
        { errorMessage: `User with email ${authUser.email} not found` }
      );

      if (!buyer.success) {
        return reply;
      }

      const listing = await find(
        request,
        reply,
        Listing,
        { id: listingId },
        { errorMessage: `Listing with ID ${listingId} not found` }
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
      const authUser = verifyToken(token, uid);

      const { success, entity: offer } = await find(
        request,
        reply,
        Offer,
        { id },
        {
          errorMessage: `Offer with ID ${id} not found`,
          populate: ["buyer", "listing.owner"],
        }
      );

      if (!success) {
        return reply;
      }

      const user = await request.em.findOne(User, { email: authUser.email });

      if (user.id != offer.buyer.id || user.id != offer.listing.owner.id) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `User does not have permission to modify offer with ID ${id}`
        );
      }

      if (offer.closedAt !== null) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `Offer with ID ${id} has been accepted and is not modifiable`
        );
      }

      if (price !== undefined) {
        offer.price = price;
      }

      if (status !== undefined) {
        offer.status = status;
      }

      if (offer.status !== "open") {
        offer.closedAt = new Date();
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

      try {
        const authUser = verifyToken(token, uid);

        const { success, entity: offer } = await find(
          request,
          reply,
          Offer,
          { id },
          {
            errorMessage: `Offer with ID ${id} not found`,
            populate: ["buyer", "listing.owner"],
          }
        );

        if (!success) {
          return reply;
        }

        const user = await request.em.findOne(User, { email: authUser.email });

        if (user.id != offer.buyer.id || user.id != offer.listing.owner.id) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `User does not have permission to modify offer with ID ${id}`
          );
        }

        if (offer.closedAt !== null) {
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
