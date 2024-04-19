import { IsString, IsOptional, IsEmail, IsNumber, MaxLength } from 'class-validator';

export class AddDoctorDto {
  @IsString()
  fullname: string;

  @IsString()
  gender: string;

  @IsString()
  specialization: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  certifications?: string;

  @IsOptional()
  @IsString()
  languagesSpoken?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
