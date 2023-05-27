import { HttpStatus } from "./status_codes.js";
import { ProjectBaseEntity } from "./db/entities/ProjectBaseEntity.js";
import app from "./app.js";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";

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
 * @param options extra options
 * @param options.errorMessage error message to display if entity is missing or
 *  deleted
 * @param options.populate which fields to populate and return with the object
 * @param options.filterDeleted whether to exclude deleted entries
 */
export async function find<T extends typeof ProjectBaseEntity>(
  request,
  reply,
  type: T,
  mapping,
  options?: {
    errorMessage?: string;
    populate?: string[];
    filterDeleted?: boolean;
  }
): Promise<{ success: boolean; entity: any }> {
  const entity = await request.em.findOne(type, mapping, {
    populate: options.populate,
    filters: {
      [SOFT_DELETABLE_FILTER]:
        options.filterDeleted != null ? options.filterDeleted : true,
    },
  });

  if (entity === null || entity.deletedAt !== null) {
    if (options.errorMessage !== undefined) {
      await error(reply, HttpStatus.NOT_FOUND, options.errorMessage);
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
export function createBody(body, remove: Array<string> = []) {
  const data = {};

  for (const [key, value] of Object.entries(body)) {
    if (!remove.includes(key)) {
      data[key] = value;
    }
  }

  return data;
}
