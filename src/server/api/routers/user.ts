import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const userRouter = createTRPCRouter({
    create:publicProcedure.input(z.object({name:z.string().min(1),email:z.string().min(1),password:z.string().min(1)})).mutation(async({ctx,input})=>{
        await prisma.categories.create({
            data: {
              name: 'Furniture',
            },
          })
    })
})