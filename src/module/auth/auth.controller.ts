import {Body, Controller, Post, Res} from '@nestjs/common';
import { LoginDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}
    @Post("/login")
    async Login(@Body() body:LoginDto,@Res({passthrough:true}) res: Response){
        const { accessToken,refreshToken} = await this.authService.login(body)
        const options = {
            httpOnly:true,
            secure:true
        }
        res.cookie('accessToken',accessToken,options)
        res.cookie('refreshToken',refreshToken,options)
        return {
            success:true,
            message:"Login Success"
        }
    }
}
