import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const categoryRouter = createTRPCRouter({
    create:publicProcedure.input(z.object({name:z.string().min(1)})).mutation(async({ctx,input})=>{
        const category = await prisma.category.create({
            data: {
              name: 'Furniture',
            },
          })
          return categories
    })
})