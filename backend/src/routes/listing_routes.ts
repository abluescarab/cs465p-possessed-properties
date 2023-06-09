import { FastifyInstance } from "fastify";
import { Listing } from "../db/entities/Listing.js";
import { createBody, error, find } from "../utils.js";
import { User } from "../db/entities/User.js";
import { HttpStatus } from "../status_codes.js";
import type { HauntingType } from "../types.js";
import verifyToken from "../firebase/verify_token.js";
import { uploadFile } from "../plugins/minio.js";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";

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
      ownerId?: number;
      name?: string;
      address?: string;
      region?: string;
      country?: string;
      description?: string;
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
      price?: number;
      hauntingType?: HauntingType;
      filterDeleted?: boolean;
      populate?: string[];
    };
  }>("/listings", async (request, reply) => {
    const data = createBody(request.body, ["filterDeleted", "populate"]);
    const { id, filterDeleted, populate } = request.body;

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
            filterDeleted,
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
        filters: {
          [SOFT_DELETABLE_FILTER]: filterDeleted ?? true,
        },
      });

      if (listings.length === 0) {
        return error(reply, HttpStatus.NOT_FOUND, "No listings found");
      }

      app.log.info(`Found ${listings.length} listings`);
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
      hauntingType: HauntingType;
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
        imageUri: allData.filename,
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
      buyerEmail?: string;
      hauntingType?: HauntingType;
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
      hauntingType,
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

      if (listing.purchasedBy !== null) {
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

      if (hauntingType !== undefined) {
        listing.hauntingType = hauntingType;
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

        if (listing.purchasedBy !== null) {
          return error(
            reply,
            HttpStatus.FORBIDDEN,
            `Listing with ID ${id} has been purchased and is not modifiable`
          );
        }

        for (const offer of listing.offers) {
          offer.status = "cancelled";
        }

        await request.em.flush();
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
