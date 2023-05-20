import { FastifyInstance } from "fastify";
import "fastify-plugin";
import { initializeApp } from "firebase/app";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    firebase: any;
  }
}

export const fastifyFirebase = async function (app: FastifyInstance, options) {
  const firebase = initializeApp(options);
  app.decorate("firebase", firebase);
};

export const FastifyFirebasePlugin = fp(fastifyFirebase, {
  name: "fastify-firebase",
});
