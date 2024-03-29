import { IsBoolean, IsDate, IsIn, IsInt, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

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

  @IsBoolean()
  isDeleted: boolean;
}
