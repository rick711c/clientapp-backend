import { IsUUID, IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserRolesEnum } from 'src/lib/enums';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    enPassword: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(UserRolesEnum)
    role:string
}
