import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";
import { createBody, error, find } from "../utils.js";
import { HttpStatus } from "../status_codes.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import verifyToken from "../firebase/verify_token.js";

export function createUserRoutes(app: FastifyInstance) {
  const auth = getAuth(app.firebase);

  // region GET - get all users
  app.get("/users", async (request) => {
    return request.em.find(User, {}, { filters: false });
  });
  // endregion

  // region SEARCH - find a user
  app.search<{
    Body: {
      id?: number;
      email?: string;
      name?: string;
      filterDeleted?: boolean;
      populate?: boolean;
    };
  }>("/users", async (request, reply) => {
    const data = createBody(request.body, ["filterDeleted", "populate"]);
    const { populate, filterDeleted } = request.body;

    try {
      const { success, entity: user } = await find(request, reply, User, data, {
        errorMessage: `User not found`,
        populate,
        filterDeleted,
      });

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
  app.post<{
    Body: {
      email: string;
      name: string;
      password: string;
    };
  }>("/users", async (request, reply) => {
    const { email, name, password } = request.body;

    try {
      const existing = await request.em.findOne(User, { email });

      if (existing !== null) {
        return error(
          reply,
          HttpStatus.CONFLICT,
          `User with email ${email} already exists`
        );
      }

      await createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          const user = await request.em.create(User, {
            email,
            name,
          });

          await request.em.flush();
          app.log.info("Created new user: ", user);
          return reply.send(user);
        }
      );

      return error(
        reply,
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Failed to create new user`
      );
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
  app.put<{ Body: { token: string; uid: string; name: string } }>(
    "/users",
    async (request, reply) => {
      const { token, uid, name } = request.body;

      try {
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

        user.name = name;

        await request.em.flush();
        app.log.info(user);
        return reply.send(user);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
  // endregion

  // region DELETE - mark user as deleted
  app.delete<{ Body: { token: string; uid: string; email: string } }>(
    "/users",
    async (request, reply) => {
      const { token, uid } = request.body;

      try {
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

        await request.em.remove(user);
        await request.em.flush();

        app.log.info(user);
        return reply.send(user);
      } catch (err) {
        return error(reply, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      }
    }
  );
  // endregion
}
