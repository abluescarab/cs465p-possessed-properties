import { FastifyInstance } from "fastify";
import { Listing } from "../db/entities/Listing.js";
import { createBody, error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import type { HauntingType } from "../types.js";
import verifyToken from "../firebase/verify_token.js";
import { uploadFile } from "../minio.js";

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
      owner_id?: number;
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
      populate?: string[];
    };
  }>("/listings", async (request, reply) => {
    const data = createBody(request.body, ["filter_deleted", "populate"]);
    const { id, filter_deleted, populate } = request.body;

    try {
      if (id !== undefined) {
        const { success, entity: listing } = await find(
          request,
          reply,
          Listing,
          { id },
          {
            errorMessage: `Listing with ID ${id} not found`,
            populate,
            filterDeleted: filter_deleted,
          }
        );

        if (!success) {
          return reply;
        }

        app.log.info(listing);
        return reply.send(listing);
      }

      const listings = await request.em.find(Listing, data, {
        populate,
      });

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
      token: string;
      uid: string;
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
    try {
      const allData = await request.file();
      const body = Object.fromEntries(
        Object.keys(allData.fields).map((key) => [
          key,
          // @ts-ignore
          allData.fields[key].value,
        ])
      );

      const data = createBody(body, ["token", "uid"]);
      const { token, uid } = body;

      const authUser = verifyToken(token, uid);

      const { success, entity: user } = await find(
        request,
        reply,
        User,
        { email: authUser.email },
        { errorMessage: `User with email ${authUser.email} not found` }
      );

      if (!success) {
        return reply;
      }

      await uploadFile(allData);

      const listing = await request.em.create(Listing, {
        owner: user,
        imgUri: allData.filename,
        ...data,
      });

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
      token: string;
      uid: string;
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
      token,
      uid,
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
      const authUser = verifyToken(token, uid);

      const { success, entity: listing } = await find(
        request,
        reply,
        Listing,
        { id },
        {
          errorMessage: `Listing with ID ${id} not found`,
          populate: ["owner", "offers"],
        }
      );

      if (!success) {
        return reply;
      }

      const user = await request.em.findOne(User, { email: authUser.email });

      if (user.id != listing.owner.id) {
        return error(
          reply,
          HttpStatus.FORBIDDEN,
          `User does not have permission to modify listing with ID ${id}`
        );
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

      if (haunting_type !== undefined) {
        listing.haunting_type = haunting_type;
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

        // TODO: find offer to accept
        // TODO: close/reject all offers
        listing.offers.forEach((offer) => {
          if (offer.status == "open") {
            offer.status = "rejected";
          }
        });
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
  app.delete<{ Body: { token: string; uid: string; id: number } }>(
    "/listings",
    async (request, reply) => {
      const { token, uid, id } = request.body;

      try {
        const authUser = verifyToken(token, uid);

        const { success, entity: listing } = await find(
          request,
          reply,
          Listing,
          { id },
          {
            errorMessage: `Listing with ID ${id} not found`,
            populate: ["owner", "offers"],
          }
        );

        if (!success) {
          return reply;
        }

        const user = await request.em.findOne(User, { email: authUser.email });

        if (user.id != listing.owner.id) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `User does not have permission to modify listing with ID ${id}`
          );
        }

        // TODO: test
        if (listing.purchased_at !== null) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `Listing with ID ${id} has been purchased and is not modifiable`
          );
        }

        // TODO: close/reject all offers
        await request.em.remove(listing);
        await request.em.flush();

        app.log.info(listing);
        return reply.send(listing);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
  // endregion
}
