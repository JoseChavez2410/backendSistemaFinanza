import { IsEmail,MaxLength,MinLength } from "class-validator";

export class LoginAuthDto{
    @IsEmail()
    email: string;
    
    @MinLength(6)
    @MaxLength(15)
    password: string;
}