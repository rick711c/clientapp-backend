import { IsBoolean, IsDate, IsIn, IsInt, IsOptional } from 'class-validator';
import { UUID } from 'crypto';

export class CreateAppointmentDto {

  @IsInt()
  userId:UUID;
  
  @IsInt()
  doctorId: UUID;

  @IsInt()
  patientId: UUID;

  @IsDate()
  @IsOptional()
  createDate: Date;

  @IsDate()
  @IsOptional()
  modifyDate: Date;

  @IsDate()
  bookingDate: Date;

  @IsBoolean()
  isDeleted: boolean;
}
