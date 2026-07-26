
import { err, tryCatch } from "@gothalo/shared"
import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
// const authmidd=async(req:Request , res:Response , next:NextFunction)=>{

//     const token=req.cookies.token
//     if(!token){
//         return err(res,"Not authorized")
//     }
//     const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
//     if(!decoded){
//         return err(res,"Not authorizzed")
//     }
//     req.user=decoded
//     next()
// }


const authmidd=tryCatch(async(req , res ,next)=>{

    const token=req.cookies.token
    if(!token){
        return err(res,"Not authorized")
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
    if(!decoded){
        return err(res,"Not authorizzed")
    }
    req.user=decoded 
    console.log(req.user)

    next()
})

export{authmidd}