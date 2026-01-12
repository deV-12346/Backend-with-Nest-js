import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/Create-User.dto';
import { multerOption } from '../utils/multer-options.util';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([
     {name: 'coverimage', maxCount:1},
     {name: 'avatar', maxCount:1}
    ],multerOption))
    RegisterUser(
    @Body() body: CreateUserDto,
    @UploadedFiles() files:{
        coverimage? : Express.Multer.File[],
        avatar?: Express.Multer.File[]
    }){
        return this.authService.RegisterUser(body,files)
    }
}
