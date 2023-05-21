import { User } from "./db/entities/User.js";
import { Listing } from "./db/entities/Listing.js";
import { HttpStatus } from "./status_codes.js";
import { ProjectBaseEntity } from "./db/entities/ProjectBaseEntity.js";
import { OfferStatus } from "./types.js";
import app from "./app.js";

/**
 * Replies with a specified error and prints it to the console.
 * @param reply reply object
 * @param code status code
 * @param message message to send
 */
export async function error(reply, code, message) {
  app.log.info(message);
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
export async function find<T extends typeof ProjectBaseEntity>(
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
 * Creates a new request body, removing provided entries.
 * @param body body to copy
 * @param remove entries to remove
 */
export function createBody(body, remove: Array<string>) {
  const data = {};

  for (const [key, value] of Object.entries(body)) {
    if (!remove.includes(key)) {
      data[key] = value;
    }
  }

  return data;
}

/**
 * Gets the HTTP request text for an {@link OfferStatus}.
 * @param type type of {@link OfferStatus}
 */
export function httpStatus(type: OfferStatus) {
  switch (type) {
    case OfferStatus.OPEN:
      return "open";
    case OfferStatus.CLOSED:
      return "close";
    case OfferStatus.ACCEPTED:
      return "accept";
    case OfferStatus.REJECTED:
      return "reject";
    default:
      return null;
  }
}
