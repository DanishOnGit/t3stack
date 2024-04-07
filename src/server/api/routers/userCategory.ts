import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const userCategoryRouter = createTRPCRouter({
    addCategory:publicProcedure.input(z.object({userId:z.number(),categoryId:z.number()})).mutation(async({ctx,input})=>{
       await prisma.userCategory.create({
            data: {
              userId:input.userId,
              categoryId:input.categoryId
            },
          })
          return "Successfully screated"
    }),
    getUserCategories:publicProcedure.input(z.object({userId:z.number()})).query(async({input})=>{
      const data = await prisma.userCategory.findMany({
        where:{
            userId:input.userId
        }
      })
      return data
    })
})