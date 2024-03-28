import { IsEnum, IsOptional, IsString } from "class-validator";
import { LoginMethod } from "src/lib/enums";

export class LoginDto{

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    phoneNo: string

    @IsOptional()
    @IsString()
    otp: string

    @IsEnum(LoginMethod)
    loginMethod: string
}