import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()


export const userRouter = createTRPCRouter({
    create:publicProcedure.input(z.object({name:z.string().min(1),email:z.string().min(1),password:z.string().min(1)})).mutation(async({ctx,input})=>{
      try{
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const data = await prisma.user.create({
             data: {
               name: input.name,
               email:input.email,
               password:hashedPassword
             },
           });
           return data
      }catch(err){
        console.error(err)
        return err
      }
    
    }),
    getUser:publicProcedure.input(z.object({email:z.string().min(1),password:z.string().min(1)})).query(async({input})=>{
      try {
        const res = await prisma.user.findUnique({
          where:{
            email:input.email
          }
        });
        if(!res){
          throw new Error("No such email exists!")
        }
        const passwordMatch = await bcrypt.compare(input.password,res.password)
        if(!passwordMatch) throw new Error("Incorrect Password");

        const token = jwt.sign({userId:res.id},"ceopqpwqw8cne8cn72yy8en32fgyrfg9f39b49798")
        return {token,userDetails:res}
      } catch (error) {
        console.error('Error logging in:', error);
        return error
      }
    })
})