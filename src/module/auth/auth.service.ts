import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { CreateUserDto } from './dto/Create-User.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel){}
    async RegisterUser(body: CreateUserDto,files: {
    coverimage?: Express.Multer.File[];
    avatar?: Express.Multer.File[];
    }
    ): Promise<{success:boolean,message:string,data?:{otp?:number,otp_expiry?:Date}}>{
        try {
            const {username,email,password,mobile_number} = body
            const coverimage = files.coverimage?.[0]?.originalname ?? null;
            const avatar = files.avatar?.[0]?.originalname ?? null 
            const user = await this.userModel.findOne({
                where:{email}
            })
            if(user && user.dataValues.isVerified){
                throw new BadRequestException('User already exists')
            }
            const otp = Math.floor(Math.random()*9000 + 1000)
            const otp_expiry = new Date(Date.now() + 1000 * 60 * 5)
            const hasedPasword = await bcrypt.hash(password,10)
               if(user && !user.dataValues.isVerified){
                const newUser = await this.userModel.sequelize?.query(
                    `call update_user(
                    :username,
	                :password,
	                :mobile_number,
	                :otp,
                    :otp_expiry,
	                :coverimage,
	                :avatar,
	                :email
                    )`,
                    {
                    replacements :{
                        username:username,
                        password:hasedPasword,
                        mobile_number:mobile_number,
                        otp:otp, 
                        otp_expiry:otp_expiry, 
                        coverimage:coverimage,
                        avatar:avatar,
                        email:email
                    }
                })
                console.log(newUser)
                return {
                    success:true,
                    message:"OTP resent again",
                    data:{
                        otp,
                        otp_expiry
                    }
                }
               }else{
                 const newUser = await this.userModel.sequelize?.query(
            `select insert_func(
               :username,
               :email,
               :mobile_number,
               :password,
               :otp,
               :otp_expiry,
               :coverimage,
               :avatar
            )`,
            {
                replacements:{
                    username:username,
                    email:email,
                    mobile_number:mobile_number,
                    password:hasedPasword,
                    otp:otp,
                    otp_expiry:otp_expiry,
                    coverimage:coverimage || null,
                    avatar: avatar || null
                }
            }
            ) 
            console.log(newUser)
            return {
               success:true,
               message:"OTP sent",
               data:{
                   otp,
                   otp_expiry
                }
            }
        }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:"Something went wrong"
            }
        }
    }
}
