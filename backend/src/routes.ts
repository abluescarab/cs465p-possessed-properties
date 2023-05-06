import { FastifyInstance } from "fastify";
import { User } from "./db/entities/User.js";
import { Listing } from "./db/entities/Listing.js";
import { Offer } from "./db/entities/Offer.js";
import { IOfferRouteData, IUserRouteData } from "./types.js";
import { BaseEntity } from "./db/entities/BaseEntity.js";
import { HttpStatus } from "./status_codes.js";

/**
 * Replies with a specified error and prints it to the console.
 * @param reply reply object
 * @param code status code
 * @param message message to send
 */
async function error(reply, code, message) {
  console.log(message);
  return reply.status(code).send({ message: message });
}

/**
 * Find an entity, check if it exists, and return it
 * @param request query request
 * @param reply reply to send to
 * @param type type of entity
 * @param mapping entity properties
 * @param errorMessage error message to display if entity is missing or
 *  deleted
 */
async function find<T extends typeof BaseEntity>(
  request,
  reply,
  type: T,
  mapping,
  errorMessage?: string
): Promise<{ success: boolean; entity: any }> {
  const entity = await request.em.findOne(type, mapping);

  if (entity === null || entity.deleted_at !== null) {
    if (errorMessage !== undefined) {
      await error(reply, HttpStatus.NOT_FOUND, errorMessage);
    }

    return {
      success: false,
      entity: null,
    };
  }

  return { success: true, entity: entity };
}

/**
 * Find a user and their owned listing.
 * @param request query request
 * @param reply reply to send to
 * @param user_email listing owner email address
 * @param listing_name name of the listing
 */
async function findUserAndListing(
  request,
  reply,
  user_email: string,
  listing_name: string
): Promise<{ success: boolean; user: User; listing: Listing }> {
  const user = await find(
    request,
    reply,
    User,
    { email: user_email },
    `User with email ${user_email} not found`
  );

  const listing = await find(
    request,
    reply,
    Listing,
    { owner: user.entity, name: listing_name },
    `Listing with name ${listing_name} not found`
  );

  return {
    success: user.success && listing.success,
    user: user.entity,
    listing: listing.entity,
  };
}

/**
 * Creates a new request body, removing provided entries.
 * @param body body to copy
 * @param remove entries to remove
 */
function createBody(body, remove: Array<string>) {
  const data = {};

  for (const [key, value] of Object.entries(body)) {
    if (!remove.includes(key)) {
      data[key] = value;
    }
  }

  return data;
}

/**
 * Creates all routes for the Possessed Properties app.
 * @param app app instance
 * @param _options options to pass
 * @constructor
 */
async function AppRoutes(app: FastifyInstance, _options = {}) {
  if (!app) {
    throw new Error("Fastify instance has no value during routes construction");
  }

  // region User Functionality
  // GET - get all users
  app.get("/users", async (request) => {
    return request.em.find(User, {});
  });

  // SEARCH - find a user
  app.search("/users", async (request, reply) => {
    const { email } = request.body;

    try {
      const { success, entity: user } = await find(
        request,
        reply,
        User,
        { email },
        `User with email ${email} not found`
      );

      if (!success) {
        return reply;
      }

      console.log(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // POST - create a user
  app.post<{ Body: IUserRouteData }>("/users", async (request, reply) => {
    const { email, name } = request.body;

    try {
      const existing = await request.em.findOne(User, { email });

      if (existing !== null) {
        return error(
          reply,
          HttpStatus.CONFLICT,
          `User with email ${email} already exists`
        );
      }

      const user = await request.em.create(User, {
        email,
        name,
      });

      await request.em.flush();

      console.log("Created new user: ", user);
      return reply.send(user);
    } catch (err) {
      return error(
        reply,
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Failed to create new user: ${err.message}`
      );
    }
  });

  // PUT - update a user
  app.put<{ Body: IUserRouteData }>("/users", async (request, reply) => {
    const { email, name } = request.body;

    try {
      const { success, entity: user } = await find(
        request,
        reply,
        User,
        { email },
        `User with email ${email} not found`
      );

      if (!success) {
        return reply;
      }

      user.name = name;

      // persist object changes to database
      await request.em.flush();
      console.log(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });

  // DELETE - mark user as deleted
  app.delete<{
    Body: { email: string };
  }>("/users", async (request, reply) => {
    const { email } = request.body;

    // TODO: require admin access
    try {
      const { success, entity: user } = await find(
        request,
        reply,
        User,
        { email },
        `User with email ${email} not found`
      );

      if (!success) {
        return reply;
      }

      user.deleted_at = new Date();
      await request.em.flush();

      console.log(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region Listing Functionality
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
    const { owner_email, name } = request.body;

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

      const existing = await request.em.findOne(Listing, { owner, name });

      if (existing !== null) {
        return error(
          reply,
          HttpStatus.CONFLICT,
          `User with email ${owner_email} already has a listing with name ${name}`
        );
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
  // endregion

  // region Offer Functionality
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
        offers = offers.concat(await request.em.find(Offer, data));
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
      const buyer = await request.em.findOne(User, { email: buyer_email });

      if (buyer === null || buyer.deleted_at !== null) {
        return error(
          reply,
          HttpStatus.NOT_FOUND,
          `User with email ${buyer_email} not found`
        );
      }

      const listing = await request.em.findOne(Listing, { name: listing_name });

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

      offer.price = price;

      await request.em.flush();
      console.log(offer);
      return reply.send(offer);
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
  // endregion
}

export default AppRoutes;
