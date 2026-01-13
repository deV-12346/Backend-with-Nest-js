import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @Max(6)
    @Min(10)
    password:string;
}