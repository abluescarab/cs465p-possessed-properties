import Fastify from "fastify";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import AppRoutes from "./routes/routes.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import cors from "@fastify/cors";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
    level: "debug",
  },
  production: {
    level: "error",
  },
  test: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
    level: "warn",
  },
};

const app = Fastify({
  logger: envToLogger[process.env.NODE_ENV],
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(AppRoutes);
await app.register(cors, {
  origin: false,
});

export default app;
