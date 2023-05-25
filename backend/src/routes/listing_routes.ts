import { FastifyInstance } from "fastify";
import { Listing } from "../db/entities/Listing.js";
import { createBody, error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import type { HauntingType } from "../types.js";

export function createListingRoutes(app: FastifyInstance) {
  // region GET - get all listings
  app.get("/listings", async (request) => {
    return request.em.find(Listing, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find a listing
  app.search<{
    Body: {
      id?: number;
      owner_email?: string;
      name?: string;
      address?: string;
      region?: string;
      country?: string;
      description?: string;
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
      price?: number;
      haunting_type?: HauntingType;
      filter_deleted?: boolean;
    };
  }>("/listings", async (request, reply) => {
    const data = createBody(request.body, ["owner_email", "filter_deleted"]);
    const { id, owner_email, filter_deleted } = request.body;

    try {
      if (id !== undefined) {
        const listing = await request.em.findOne(Listing, { id });

        if (!listing) {
          return error(reply, HttpStatus.NOT_FOUND, "No listings found");
        }

        app.log.info(listing);
        return reply.send(listing);
      }

      if (owner_email !== undefined) {
        const { success, entity: owner } = await find(
          request,
          reply,
          User,
          {
            email: owner_email,
          },
          { filterDeleted: filter_deleted }
        );

        if (success) {
          data["owner"] = owner;
        }
      }

      const listings = await request.em.find(Listing, data);

      if (listings.length === 0) {
        return error(reply, HttpStatus.NOT_FOUND, "No listings found");
      }

      app.log.info(listings);
      return reply.send(listings);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region POST - create a listing
  app.post<{
    Body: {
      owner_email: string;
      name: string;
      address?: string;
      region: string;
      country: string;
      description: string;
      bedrooms: number;
      bathrooms: number;
      area: number;
      price: number;
      haunting_type: HauntingType;
    };
  }>("/listings", async (request, reply) => {
    const data = createBody(request.body, ["owner_email"]);
    const { owner_email } = request.body;

    try {
      const { success, entity: owner } = await find(
        request,
        reply,
        User,
        { email: owner_email },
        { errorMessage: `User with email ${owner_email} not found` }
      );

      if (success) {
        data["owner"] = owner;
      } else {
        return reply;
      }

      const listing = await request.em.create(Listing, data);
      await request.em.flush();

      app.log.info("Created new listing: ", listing);
      return reply.send(listing);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region PUT - update a listing
  app.put<{
    Body: {
      id: number;
      name?: string;
      description?: string;
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
      price?: number;
      buyer_email?: string;
      haunting_type?: HauntingType;
    };
  }>("/listings", async (request, reply) => {
    const {
      id,
      name,
      description,
      bedrooms,
      bathrooms,
      area,
      price,
      buyer_email,
      haunting_type,
    } = request.body;

    try {
      const { success, entity: listing } = await find(
        request,
        reply,
        Listing,
        { id },
        { errorMessage: `Listing with ID ${id} not found` }
      );

      if (!success) {
        return reply;
      }

      if (listing.purchased_at !== null) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `Listing with ID ${id} has been purchased and is not modifiable`
        );
      }

      if (name !== undefined) {
        listing.name = name;
      }

      if (description !== undefined) {
        listing.description = description;
      }

      if (bedrooms !== undefined) {
        listing.bedrooms = bedrooms;
      }

      if (bathrooms !== undefined) {
        listing.bathrooms = bathrooms;
      }

      if (area !== undefined) {
        listing.area = area;
      }

      if (price !== undefined) {
        listing.price = price;
      }

      if (buyer_email !== undefined) {
        const { success, entity: buyer } = await find(
          request,
          reply,
          User,
          { email: buyer_email },
          { errorMessage: `User with email ${buyer_email} not found` }
        );

        if (!success) {
          return reply;
        }

        buyer.purchased_properties.add(listing);
        listing.purchased_by = buyer;
        listing.purchased_at = new Date();

        // TODO: close/reject all offers
      }

      if (haunting_type !== undefined) {
        listing.haunting_type = haunting_type;
      }

      await request.em.flush();
      app.log.info(listing);
      return reply.send(listing);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region DELETE - mark a listing as deleted
  app.delete<{ Body: { id: number } }>("/listings", async (request, reply) => {
    const { id } = request.body;

    // TODO: require authentication (?)
    try {
      const { success, entity: listing } = await find(
        request,
        reply,
        Listing,
        { id },
        { errorMessage: `Listing with ID ${id} not found` }
      );

      if (!success) {
        return reply;
      }

      // TODO: test
      if (listing.purchased_at !== null) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `Listing with ID ${id} has been purchased and is not modifiable`
        );
      }

      await request.em.remove(listing);
      await request.em.flush();

      app.log.info(listing);
      return reply.send(listing);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion
}
