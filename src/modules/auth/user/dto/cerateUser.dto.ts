import { IsUUID, IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserRolesEnum } from 'src/lib/enums';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    enPassword: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(UserRolesEnum)
    role:string

    constructor(){
        this.firstName = 'Guest';
        this.lastName = '';
    }
}
