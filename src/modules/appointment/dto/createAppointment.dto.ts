import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { DaysOfWeek } from 'src/lib/enums';

export class CreateAppointmentDto {

  @IsString()
  doctorId: UUID;

  @IsString()
  patientId: UUID;

  @IsOptional()
  @IsUUID()
  createdBy:UUID;

  @IsOptional()
  @IsDate()
  createDate: Date;

  @IsOptional()
  @IsDate()
  modifyDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  bookingDate: Date;

  @IsString()
  clinicId: UUID;

  @IsString()
  bookingDayId:UUID;

  @IsNotEmpty({message: 'required field'})
  @IsUUID()
  bookingHourId:UUID;

  @IsBoolean()
  isDeleted: boolean;

  // constructor(){
  //    this.bookingDate.setHours(0,0,0,0);
  // }
}
