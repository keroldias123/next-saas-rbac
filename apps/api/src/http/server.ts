import fastify from "fastify";
import {  serializerCompiler, validatorCompiler, type ZodTypeProvider,jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import fastifyCors from "@fastify/cors";
import { createAccountRoute } from "./routes/auth/create-account";
const Server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();


if (process.env.NODE_ENV==='development') {
    
    Server.register(fastifySwagger, {
      openapi: {
        info: {
          title: "API NodeJS",
          description: "API NodeJS",
          version: "1.0.0",
        },
      },
      transform:jsonSchemaTransform,
    });
    
    // Server.register(fastifySwaggerUi,{
    //   routePrefix: "/docs",
    // });
     Server.register(scalarAPIReference, { routePrefix: '/docs',})
}

Server.setSerializerCompiler(serializerCompiler);
Server.setValidatorCompiler(validatorCompiler);

Server.register(fastifyCors,{
  origin: true,
});

Server.register(createAccountRoute)

Server.listen({port:3333,host: "0.0.0.0",}).then(() => {
  console.log(`Server running at http://localhost:3333`);
}); 