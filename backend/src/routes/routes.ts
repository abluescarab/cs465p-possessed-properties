import { FastifyInstance } from "fastify";
import { createUserRoutes } from "./user_routes.js";
import { createListingRoutes } from "./listing_routes.js";
import { createOfferRoutes } from "./offer_routes.js";

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

  createUserRoutes(app);
  createListingRoutes(app);
  createOfferRoutes(app);
}

export default AppRoutes;
