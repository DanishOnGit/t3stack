import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()


export const categoryRouter = createTRPCRouter({
    createCategory:publicProcedure.input(z.object({name:z.string().min(1)})).mutation(async({ctx,input})=>{
       await prisma.categories.create({
            data: {
              name:faker.commerce.product(),
            },
          })
          return "Successfully screated"
    }),
    getCategories:publicProcedure.query(async({input})=>{
      const pageSize = 6;
      const offset = 1 * pageSize;
      const data = await prisma.categories.findMany({
        take:pageSize,
        skip:offset
      })
      return data
    })
})