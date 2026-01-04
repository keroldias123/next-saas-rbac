import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import  { z } from "zod";
import { db } from "../../../db";
import { users } from "../../../db/Table";
import {hash} from "bcryptjs";
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
   const {name,email,password}=request.body

   const userwithSameEmail=await db.select().from(users).where(eq(users.email,email))

   if(userwithSameEmail.length>0){
    return reply.status(400).send({message:"User with same email already exists"})
   }

   const passwordhash=await hash(password,6)

   const user=await db.insert(users).values({
    name,
    email,
    passwordhash,
   })

   return reply.status(201).send({message:"User created successfully"})
   })
};