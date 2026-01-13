import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req:Request ,res: Response,next: NextFunction){
        const authorization = req.headers.authorization
        if(authorization && authorization.startsWith('Bearer ')){
            req.token = authorization.split(' ')[1];
            next()
        }
    }
}