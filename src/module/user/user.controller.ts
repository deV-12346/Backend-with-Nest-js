import { Body, Controller, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { CreateUserDto } from '../user/dto/Create-User.dto';
import { multerOption } from '../utils/multer-options.util';
import { UserService } from './user.service';
import { VerifyOtpDto } from './dto/Verify-OTP.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Post('register')
    @UseInterceptors(FileFieldsInterceptor([
            { name: 'coverimage', maxCount: 1 },
            { name: 'avatar', maxCount: 1 }
        ], multerOption))
    RegisterUser(
            @Body() body: CreateUserDto,
            @UploadedFiles() files: {
                coverimage?: Express.Multer.File[],
                avatar?: Express.Multer.File[]
            }) {
            return this.userService.RegisterUser(body, files)
    }
    @Post('verify-otp')
    VerifyOtp(@Query() query: VerifyOtpDto ){
        return this.userService.VerifyOtp(query.email,Number(query.otp))
    }
}
