import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from "class-validator"
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @Max(10)
    @Min(6)
    username:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    @Max(10)
    @Min(6)
    password:string;

    @IsOptional()
    @IsMobilePhone()
    @Length(10)
    mobile_number:string
}