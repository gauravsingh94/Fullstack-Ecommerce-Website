import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from 'express';

//Secret
const userSecret = process.env.USER_SECRET!;
const adminSecret = process.env.ADMIN_SECRET!;


// User JWT part generation and authentication
export const generateJWTuser = (id:string)=>{
    const payload = {id};
    return jwt.sign(payload,userSecret);
}

export const authenticateJWTuser = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(authHeader){
       const token = authHeader.split(" ")[1];
       jwt.verify(token,userSecret,(err,user)=>{
            if(err){
                res.status(403).json({error:err});
            }
            if(!user || typeof user==='string'){
               return res.sendStatus(403);
            }
            
            req.headers['userId'] = user.id;
            next();
       })
    }
    else{
        res.status(401).json({error:"Unauthorized."});
    }
} 

// Admin JWT part generation and authentication
export const generateJWTadmin = (id:string)=>{
    const payload = {id};
    return jwt.sign(payload,adminSecret,{expiresIn:'1hr'});
}

export const authenticateJWTadmin = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
       const token = authHeader.split(" ")[1];
       jwt.verify(token,adminSecret,(err,admin)=>{
            if(err){
                res.status(403).json({error:err});
            }
            if(!admin || typeof admin==='string'){
               return res.sendStatus(403);
            }
            
            req.headers['adminId'] = admin.id;
            next();
       })
    }
    else{
        res.status(401).json({error:"Unauthorized."});
    }
}