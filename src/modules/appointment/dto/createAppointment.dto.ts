import { IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { DaysOfWeek } from 'src/lib/enums';

export class CreateAppointmentDto {

  @IsInt()
  doctorId: UUID;

  @IsInt()
  patientId: UUID;

  @IsUUID()
  createdBy:UUID;

  @IsDate()
  @IsOptional()
  createDate: Date;

  @IsDate()
  @IsOptional()
  modifyDate: Date;

  @IsDate()
  bookingDate: Date;

  @IsString()
  clinicId: UUID;

  @IsString()
  bookingDayId:UUID;

  @IsString()
  bookingHourId:UUID;

  @IsBoolean()
  isDeleted: boolean;

  // constructor(){
  //    this.bookingDate.setHours(0,0,0,0);
  // }
}
