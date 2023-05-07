import { FastifyInstance } from "fastify";
import { Offer } from "../db/entities/Offer.js";
import { error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import { Listing } from "../db/entities/Listing.js";
import { IOfferRouteData } from "../types.js";

export function createOfferRoutes(app: FastifyInstance) {
  // GET - get all offers
  app.get("/offers", async (request) => {
    return request.em.find(Offer, {});
  });

  // SEARCH - find an offer
  app.search<{
    Body: { buyer_email?: string; listing_name?: string; price?: number };
  }>("/offers", async (request, reply) => {
    const data = {};
    const { buyer_email, listing_name, price } = request.body;
    let listings = null;

    try {
      if (buyer_email !== undefined) {
        const { success, entity: buyer } = await find(request, reply, User, {
          email: buyer_email,
        });

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

      console.log(offers);
      return reply.send(offers);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // POST - create an offer
  app.post<{ Body: IOfferRouteData }>("/offers", async (request, reply) => {
    const { buyer_email, owner_email, listing_name, price } = request.body;

    try {
      const buyer = await find(
        request,
        reply,
        User,
        { email: buyer_email },
        `User with email ${buyer_email} not found`
      );

      if (!buyer.success) {
        return reply;
      }

      const owner = await find(
        request,
        reply,
        User,
        { email: owner_email },
        `User with email ${owner_email} not found`
      );

      if (!owner.success) {
        return reply;
      }

      const listing = await find(
        request,
        reply,
        Listing,
        { owner: owner.entity, name: listing_name },
        `Listing with name ${listing_name} not found`
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

      console.log(offer);
      return reply.send(offer);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // PUT - update an offer
  app.put<{ Body: IOfferRouteData }>("/offers", async (request, reply) => {
    const { buyer_email, listing_name, price } = request.body;

    try {
      const buyer = await find(
        request,
        reply,
        User,
        { email: buyer_email },
        `User with email ${buyer_email} not found`
      );

      if (!buyer.success) {
        return reply;
      }

      // const buyer = await request.em.findOne(User, { email: buyer_email });
      //
      // if (buyer === null || buyer.deleted_at !== null) {
      //   return error(
      //     reply,
      //     HttpStatus.NOT_FOUND,
      //     `User with email ${buyer_email} not found`
      //   );
      // }

      const listing = await find(
        request,
        reply,
        Listing,
        { name: listing_name },
        `Listing with name ${listing_name} not found`
      );

      if (!listing.success) {
        return reply;
      }

      // const listing = await request.em.findOne(Listing, { name: listing_name });
      //
      // if (listing === null || listing.deleted_at !== null) {
      //   return error(
      //     reply,
      //     HttpStatus.NOT_FOUND,
      //     `Listing with name ${listing_name} not found`
      //   );
      // }

      const offer = await find(
        request,
        reply,
        Offer,
        { buyer: buyer.entity, listing: listing.entity },
        `User with email ${buyer_email} not has made an offer on listing with name ${listing_name}`
      );

      // const offer = await request.em.findOne(Offer, {
      //   buyer: buyer.entity,
      //   listing: listing.entity,
      // });
      //
      // if (offer === null || offer.deleted_at !== null) {
      //   return error(
      //     reply,
      //     HttpStatus.NOT_FOUND,
      //     `User with email ${buyer_email} has not made an offer on listing with name ${listing_name}`
      //   );
      // }

      offer.entity.price = price;

      await request.em.flush();
      console.log(offer.entity);
      return reply.send(offer.entity);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // DELETE - mark an offer as deleted
  app.delete<{ Body: { buyer_email: string; listing_name: string } }>(
    "/offers",
    async (request, reply) => {
      const { buyer_email, listing_name } = request.body;

      try {
        const buyer = await request.em.findOne(User, { email: buyer_email });

        if (buyer === null || buyer.deleted_at !== null) {
          return error(
            reply,
            HttpStatus.NOT_FOUND,
            `User with email ${buyer_email} not found`
          );
        }

        const listing = await request.em.findOne(Listing, {
          name: listing_name,
        });

        if (listing === null || listing.deleted_at !== null) {
          return error(
            reply,
            HttpStatus.NOT_FOUND,
            `Listing with name ${listing_name} not found`
          );
        }

        const offer = await request.em.findOne(Offer, { buyer, listing });

        if (offer === null || offer.deleted_at !== null) {
          return error(
            reply,
            HttpStatus.NOT_FOUND,
            `User with email ${buyer_email} has not made an offer on listing with name ${listing_name}`
          );
        }

        offer.deleted_at = new Date();
        await request.em.flush();

        console.log(offer);
        return reply.send(offer);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
}
