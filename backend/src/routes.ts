import { FastifyInstance } from "fastify";
import { User } from "./db/entities/User.js";
import { Listing } from "./db/entities/Listing.js";
import { Offer } from "./db/entities/Offer.js";
import { IOfferRouteData, IUserRouteData } from "./types.js";

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
      const user = await request.em.findOne(User, { email });

      if (user === null || user.deleted_at !== null) {
        return error(reply, 404, `User with email address ${email} not found`);
      }

      return reply.send(user);
    } catch (err) {
      return error(reply, 500, err.message);
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
          500,
          `User with email address ${email} already exists`
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
      return error(reply, 500, `Failed to create new user: ${err.message}`);
    }
  });

  // PUT - update a user
  app.put<{ Body: IUserRouteData }>("/users", async (request, reply) => {
    const { email, name } = request.body;

    try {
      const user = await request.em.findOne(User, { email });

      if (user === null || user.deleted_at !== null) {
        return error(reply, 404, `User with email address ${email} not found`);
      }

      user.name = name;

      // persist object changes to database
      await request.em.flush();
      console.log(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, 500, err.message);
    }
  });

  // DELETE - mark user as deleted
  app.delete<{
    Body: { email: string };
  }>("/users", async (request, reply) => {
    const { email } = request.body;

    // TODO: require admin access
    try {
      const user = await request.em.findOne(User, { email });

      if (user === null || user.deleted_at !== null) {
        return error(reply, 404, `User with email address ${email} not found`);
      }

      user.deleted_at = new Date();
      await request.em.flush();

      console.log(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, 500, err.message);
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
        const owner = await request.em.findOne(User, {
          email: owner_email,
        });

        if (owner !== null && owner.deleted_at === null) {
          data["owner"] = owner;
        }
      }

      const listings = await request.em.find(Listing, data);

      if (listings.length === 0) {
        return error(reply, 404, "No listings found");
      }

      console.log(listings);
      return reply.send(listings);
    } catch (err) {
      return error(reply, 500, err.message);
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
    const data = createBody(request.body, ["email"]);
    const { owner_email } = request.body;

    try {
      const result = await find(
        request,
        reply,
        User,
        { email: owner_email },
        {
          errorMessage: `User with email ${owner_email} not found`,
          dataObject: data,
          dataName: "owner",
        }
      );

      if (!result.success) {
        return result.reply;
      }

      // const owner = await request.em.findOne(User, { email: owner_email });
      //
      // if (owner === null || owner.deleted_at !== null) {
      //   return error(
      //     reply,
      //     404,
      //     `User with email ${owner_email} not found`
      //   );
      // } else {
      //   data["owner"] = owner;
      // }

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
      const owner = await request.em.findOne(User, { email: owner_email });

      if (owner === null || owner.deleted_at !== null) {
        return error(reply, 404, `User with email ${owner_email} not found`);
      }

      const listing = await request.em.findOne(Listing, { owner, name });

      if (listing === null || listing.deleted_at !== null) {
        return error(reply, 404, `Listing with name ${name} not found`);
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
      return error(reply, 500, err.message);
    }
  });

  // DELETE - mark a listing as deleted
  app.delete<{ Body: { owner_email: string; name: string } }>(
    "/listings",
    async (request, reply) => {
      const { owner_email, name } = request.body;

      try {
        const owner = await request.em.findOne(User, { email: owner_email });

        if (owner === null || owner.deleted_at !== null) {
          return error(reply, 404, `User with email ${owner_email} not found`);
        }

        const listing = await request.em.findOne(Listing, { owner, name });

        if (listing === null || listing.deleted_at !== null) {
          return error(reply, 404, `Listing with name ${name} not found`);
        }

        listing.deleted_at = new Date();
        await request.em.flush();

        console.log(listing);
        return reply.send(listing);
      } catch (err) {
        return error(reply, 500, err.message);
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
    const data = createBody(request.body, ["buyer_email", "listing_name"]);
    const { buyer_email, listing_name } = request.body;

    try {
      if (buyer_email !== undefined) {
        const buyer = await request.em.findOne(User, { email: buyer_email });

        if (buyer === null || buyer.deleted_at !== null) {
          return error(
            reply,
            404,
            `Listing with buyer ${buyer_email} not found`
          );
        } else {
          data["buyer"] = buyer;
        }
      }

      if (listing_name !== undefined) {
        const listing = await request.em.findOne(Listing, {
          name: listing_name,
        });

        if (listing === null || listing.deleted_at !== null) {
          return error(
            reply,
            404,
            `Listing with name ${listing_name} not found`
          );
        } else {
          data["listing"] = listing;
        }
      }

      const offers = await request.em.find(Offer, data);

      if (offers.length === 0) {
        return error(reply, 404, `No offers found`);
      }

      console.log(offers);
      return reply.send(offers);
    } catch (err) {
      return error(reply, 500, err.message);
    }
  });

  // POST - create an offer
  app.post<{ Body: IOfferRouteData }>("/offers", async (request, reply) => {
    const { buyer_email, listing_name, price } = request.body;

    try {
      const buyer = await request.em.findOne(User, { email: buyer_email });

      if (buyer === null) {
        return error(reply, 404, `User with email ${buyer_email} not found`);
      }

      const listing = await request.em.findOne(Listing, { name: listing_name });

      if (listing === null) {
        return error(reply, 404, `Listing with name ${listing_name} not found`);
      }

      const offer = await request.em.create(Offer, { buyer, listing, price });
      await request.em.flush();

      console.log(offer);
      return reply.send(offer);
    } catch (err) {
      return error(reply, 500, err.message);
    }
  });

  // PUT - update an offer
  app.put<{ Body: IOfferRouteData }>("/offers", async (request, reply) => {
    const { buyer_email, listing_name, price } = request.body;

    try {
      const buyer = await request.em.findOne(User, { email: buyer_email });

      if (buyer === null || buyer.deleted_at !== null) {
        return error(reply, 404, `User with email ${buyer_email} not found`);
      }

      const listing = await request.em.findOne(Listing, { name: listing_name });

      if (listing === null || listing.deleted_at !== null) {
        return error(reply, 404, `Listing with name ${listing_name} not found`);
      }

      const offer = await request.em.findOne(Offer, { buyer, listing });

      if (offer === null || offer.deleted_at !== null) {
        return error(
          reply,
          404,
          `User with email ${buyer_email} has not made an offer on listing with name ${listing_name}`
        );
      }

      offer.price = price;

      await request.em.flush();
      console.log(offer);
      return reply.send(offer);
    } catch (err) {
      return error(reply, 500, err.message);
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
          return error(reply, 404, `User with email ${buyer_email} not found`);
        }

        const listing = await request.em.findOne(Listing, {
          name: listing_name,
        });

        if (listing === null || listing.deleted_at !== null) {
          return error(
            reply,
            404,
            `Listing with name ${listing_name} not found`
          );
        }

        const offer = await request.em.findOne(Offer, { buyer, listing });

        if (offer === null || offer.deleted_at !== null) {
          return error(
            reply,
            404,
            `User with email ${buyer_email} has not made an offer on listing with name ${listing_name}`
          );
        }

        offer.deleted_at = new Date();
        await request.em.flush();

        console.log(offer);
        return reply.send(offer);
      } catch (err) {
        return error(reply, 404, err.message);
      }
    }
  );
  // endregion
}

export default AppRoutes;
