import { FastifyInstance } from "fastify";
import { Listing } from "../db/entities/Listing.js";
import { createBody, error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";

export function createListingRoutes(app: FastifyInstance) {
  // region GET - get all listings
  app.get("/listings", async (request) => {
    return request.em.find(Listing, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find a listing
  app.search<{
    Body: {
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
    };
  }>("/listings", async (request, reply) => {
    const data = createBody(request.body, ["owner_email"]);
    const { owner_email } = request.body;

    try {
      if (owner_email !== undefined) {
        const { success, entity: owner } = await find(request, reply, User, {
          email: owner_email,
        });

        if (success) {
          data["owner"] = owner;
        }
      }

      const listings = await request.em.find(Listing, data);

      if (listings.length === 0) {
        return error(reply, HttpStatus.NOT_FOUND, "No listings found");
      }

      console.log(listings);
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
        `User with email ${owner_email} not found`
      );

      if (success) {
        data["owner"] = owner;
      } else {
        return reply;
      }

      const listing = await request.em.create(Listing, data);
      await request.em.flush();

      console.log("Created new listing: ", listing);
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
    } = request.body;

    try {
      const { success, entity: listing } = await find(
        request,
        reply,
        Listing,
        { id },
        `Listing with ID ${id} not found`
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
          `User with email ${buyer_email} not found`
        );

        if (!success) {
          return reply;
        }

        buyer.purchased_properties.add(listing);
        listing.purchased_by = buyer;
        listing.purchased_at = new Date();

        // TODO: close/reject all offers
      }

      await request.em.flush();
      console.log(listing);
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
        `Listing with ID ${id} not found`
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

      // listing.deleted_at = new Date();
      await request.em.remove(listing);
      await request.em.flush();

      console.log(listing);
      return reply.send(listing);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion
}
