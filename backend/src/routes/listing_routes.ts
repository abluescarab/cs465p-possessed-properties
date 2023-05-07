import { FastifyInstance } from "fastify";
import { Listing } from "../db/entities/Listing.js";
import { createBody, error, find, findUserAndListing } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";

export function createListingRoutes(app: FastifyInstance) {
  // GET - get all listings
  app.get("/listings", async (request) => {
    return request.em.find(Listing, {});
  });

  // SEARCH - find a listing
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

  // POST - create a listing
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

  // PUT - update a listing
  app.put<{
    Body: {
      owner_email: string;
      name: string;
      description: string;
      bedrooms: number;
      bathrooms: number;
      price: number;
    };
  }>("/listings", async (request, reply) => {
    const { owner_email, name, description, bedrooms, bathrooms, price } =
      request.body;

    try {
      const { success, listing } = await findUserAndListing(
        request,
        reply,
        owner_email,
        name
      );

      if (!success) {
        return reply;
      }

      // const owner = await find(
      //   request,
      //   reply,
      //   User,
      //   { email: owner_email },
      //   { errorMessage: `User with email ${owner_email} not found` }
      // );
      //
      // if (!owner.success) {
      //   return reply;
      // }
      //
      // const listing = await find(
      //   request,
      //   reply,
      //   Listing,
      //   { owner: owner.entity, name },
      //   { errorMessage: `Listing with name ${name} not found` }
      // );
      //
      // if (!listing.success) {
      //   return reply;
      // }

      if (listing.purchased_at !== null) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `Listing with name ${name} has been purchased and is not modifiable`
        );
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

      if (price !== undefined) {
        listing.price = price;
      }

      await request.em.flush();
      console.log(listing);
      return reply.send(listing);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // DELETE - mark a listing as deleted
  app.delete<{ Body: { owner_email: string; name: string } }>(
    "/listings",
    async (request, reply) => {
      const { owner_email, name } = request.body;

      // TODO: require authentication (?)
      try {
        const { success, listing } = await findUserAndListing(
          request,
          reply,
          owner_email,
          name
        );

        if (!success) {
          return reply;
        }

        // TODO: test
        if (listing.purchased_at !== null) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `Listing with name ${name} has been purchased and is not modifiable`
          );
        }

        listing.deleted_at = new Date();
        await request.em.flush();

        console.log(listing);
        return reply.send(listing);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
}
