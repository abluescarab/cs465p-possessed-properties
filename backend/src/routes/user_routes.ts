import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";
import { error, find } from "../utils.js";
import { HttpStatus } from "../status_codes.js";
import { IUserRouteData } from "../types.js";

export function createUserRoutes(app: FastifyInstance) {
  // region GET - get all users
  app.get("/users", async (request) => {
    return request.em.find(User, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find a user
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

      app.log.info(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region POST - create a user
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

      app.log.info("Created new user: ", user);
      return reply.send(user);
    } catch (err) {
      return error(
        reply,
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Failed to create new user: ${err.message}`
      );
    }
  });
  // endregion

  // region PUT - update a user
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
      app.log.info(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion

  // region DELETE - mark user as deleted
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

      // user.deleted_at = new Date();
      await request.em.remove(user);
      await request.em.flush();

      app.log.info(user);
      return reply.send(user);
    } catch (err) {
      return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  });
  // endregion
}
