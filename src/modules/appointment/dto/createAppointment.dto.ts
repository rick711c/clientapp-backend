import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { DaysOfWeek } from 'src/lib/enums';
import { DoctorInfo, PatientInfo } from 'src/lib/interfaces/index.interface';

export class CreateAppointmentDto {
  @IsString()
  doctorId: UUID;

  @IsString()
  patientId: UUID;

  @IsOptional()
  @IsUUID()
  createdBy: UUID;

  @IsOptional()
  @IsDate()
  createDate: Date;

  @IsOptional()
  @IsDate()
  modifyDate: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value))
  bookingDate: Date;

  @IsString()
  clinicId: UUID;

  @IsString()
  bookingDayId: UUID;

  @IsNotEmpty({ message: 'required field' })
  @IsUUID()
  bookingHourId: UUID;

  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsJSON()
  doctorInfo: DoctorInfo;

  @IsOptional()
  @IsJSON()
  patientInfo: PatientInfo;

  @IsOptional()
  @IsNumber()
  status: number;
}
