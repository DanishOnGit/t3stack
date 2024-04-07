import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()


export const categoryRouter = createTRPCRouter({
    createCategory:publicProcedure.input(z.object({name:z.string().min(1)})).mutation(async({ctx,input})=>{
       await prisma.category.create({
            data: {
              name:faker.commerce.product(),
            },
          })
          return "Successfully screated"
    }),
    getCategories:publicProcedure.input(z.object({offset:z.number()})).query(async({ctx,input})=>{
      const pageSize = 6;
      const offset = input.offset
      const count  = await prisma.category.count();
      const data = await prisma.category.findMany({
        take:pageSize,
        skip:offset
      })
      return {data,count}
    })
})