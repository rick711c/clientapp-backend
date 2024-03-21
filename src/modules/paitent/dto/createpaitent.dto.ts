import { IsNotEmpty, IsOptional, IsEmail, IsBoolean, IsString, IsPhoneNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreatePatientDto {

    @IsString()
    name: string;

   @IsPhoneNumber()
    phoneNumber: string;

    @IsUUID()
    userId:UUID

    @IsOptional()
    @IsEmail()
    email: string;

    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}
