import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()


export const userRouter = createTRPCRouter({
    create:publicProcedure.input(z.object({name:z.string().min(1),email:z.string().min(1),password:z.string().min(1)})).mutation(async({ctx,input})=>{
      const hashedPassword = await bcrypt.hash(input.password, 10);
       const data = await prisma.user.create({
            data: {
              name: input.name,
              email:input.email,
              password:hashedPassword
            },
          });
          return data
    }),
    getUser:publicProcedure.input(z.object({email:z.string().min(1),password:z.string().min(1)})).query(async({input})=>{
      try {
        
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
      const res = await prisma.user.findUnique({
        where:{
          email:input.email
        }
      });
      if(!res) return "No such Email found!"
    })
})