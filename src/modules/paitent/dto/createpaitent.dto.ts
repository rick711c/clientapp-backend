import { IsNotEmpty, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class CreatePatientDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}
