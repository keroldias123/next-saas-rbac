import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import  { z } from "zod";

export const createAccountRoute = (server: FastifyInstance) => {
   server.withTypeProvider<ZodTypeProvider>().post("/auth/create-account",{
    schema:{
        body:z.object({
            name:z.string().min(3),
            email:z.string().email(),
            password:z.string().min(6),
        })
    }
   }, async (request, reply) => {
    reply.send({message:"create account"});
   })
};