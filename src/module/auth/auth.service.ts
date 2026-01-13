import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { LoginDto } from './dto/LoginUser.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly userModel:typeof UserModel,
    private readonly jwtService:JwtService){}
    async generateAccessToken(user){
        const payload ={
                user_id:user.user_id,
                username:user.username,
        }
        return this.jwtService.sign(
            payload,
            {
                secret:process.env.JWT_ACCESS_SECRET,
                expiresIn:"1h"
            },
        )
    }
    async generateRefreshToken(user){
        const payload ={
                user_id:user.user_id,
                username:user.username,
                email:user.email
        }
        return this.jwtService.sign(payload,
            {
                secret:process.env.JWT_REFRESH_SECRET,
                expiresIn:"7d"
            },
        )
    }
    async login(body: LoginDto):Promise<{accessToken:string,refreshToken:string}>{
       const {email,password} = body
       const user = await this.userModel.findOne({
        where:{email}
       })
       if(!user){
         throw new BadRequestException("User not found please register")
       }
       if(!user.dataValues.isVerified){
        throw new BadRequestException('Please verify your account first')
       }
       const isPasswordCorrect = await bcrypt.compare(password,user.dataValues.password)
       if(!isPasswordCorrect){
         throw new BadRequestException("Invalid Password")
       }
       const accessToken = await this.generateAccessToken(user)
       const refreshToken = await this.generateRefreshToken(user)
       await user.update({
        refresh_token: refreshToken
       })
       return {
        accessToken,
        refreshToken
       }
    }
}
