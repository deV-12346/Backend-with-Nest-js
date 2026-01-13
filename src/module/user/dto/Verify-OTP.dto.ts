import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, Length } from "class-validator";

export class VerifyOtpDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNumber()
    @Length(4)
    @IsNotEmpty()
    otp:string
}