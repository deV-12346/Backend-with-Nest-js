import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class JwtAuthGuard implements CanActivate{
    constructor(private jwt: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = req.token
        if(!token){
            throw new UnauthorizedException('Unauthorized Request')
        }
        try {
        const decoded = this.jwt.verify(token,{
            secret: process.env.JWT_ACCESS_SECRET
        })
        req.user = decoded
        return true   
        } catch (error){
            throw new UnauthorizedException("Invalid or expired token");
        }
    }
}