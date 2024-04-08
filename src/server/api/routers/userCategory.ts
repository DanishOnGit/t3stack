import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const userCategoryRouter = createTRPCRouter({
    addCategory:publicProcedure.input(z.object({userId:z.number(),categoryId:z.number()})).mutation(async({ctx,input})=>{
      const isExist = await prisma.userCategory.findFirst({
        where:{
          userId:input.userId,
          categoryId:input.categoryId
        }
      });
      if(isExist) return "Already selected category!"
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
    }),
    removeCategory:publicProcedure.input(z.object({userId:z.number(),categoryId:z.number()})).mutation(async({ctx,input})=>{
      const isExist = await prisma.userCategory.findFirst({
        where:{
          userId:input.userId,
          categoryId:input.categoryId
        }
      });

      if(isExist){
        await prisma.userCategory.delete({
          where:{
            id: isExist.id
          }
        })
        return "Successfully Deleted"
      }
      return "Invalid Query"
    })
})