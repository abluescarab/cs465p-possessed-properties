import Fastify from "fastify";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import AppRoutes from "./routes.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);
await app.register(AppRoutes);

export default app;
