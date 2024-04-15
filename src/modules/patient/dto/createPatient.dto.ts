import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsString,
  IsPhoneNumber,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { UUID } from 'crypto';
import { Gender } from 'src/lib/enums';

export class CreatePatientDto {
  @IsString()
  fullname: string;

  @IsEnum(Gender)
  gender:string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsUUID()
  createdBy: UUID;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}
