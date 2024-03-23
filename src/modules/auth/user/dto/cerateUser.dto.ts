import { IsUUID, IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserRoles } from 'src/lib/enums';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    enPassword: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(UserRoles)
    role:string
}
