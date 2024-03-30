import { IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { DaysOfWeek } from 'src/lib/enums';

export class CreateAppointmentDto {

  @IsString()
  doctorId: UUID;

  @IsString()
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

  @IsNotEmpty({message: 'required field'})
  @IsString()
  bookingHourId:UUID;

  @IsBoolean()
  isDeleted: boolean;

  // constructor(){
  //    this.bookingDate.setHours(0,0,0,0);
  // }
}
