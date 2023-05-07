import { User } from "./db/entities/User.js";
import { Listing } from "./db/entities/Listing.js";
import { HttpStatus } from "./status_codes.js";
import { BaseEntity } from "./db/entities/BaseEntity.js";

/**
 * Replies with a specified error and prints it to the console.
 * @param reply reply object
 * @param code status code
 * @param message message to send
 */
export async function error(reply, code, message) {
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
export async function find<T extends typeof BaseEntity>(
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
export async function findUserAndListing(
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
export function createBody(body, remove: Array<string>) {
  const data = {};

  for (const [key, value] of Object.entries(body)) {
    if (!remove.includes(key)) {
      data[key] = value;
    }
  }

  return data;
}
