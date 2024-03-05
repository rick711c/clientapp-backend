import { IsBoolean, IsDate, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  doctorId: number;

  @IsInt()
  patientId: number;

  @IsDate()
  createDate: Date;

  @IsDate()
  modifyDate: Date;

  @IsDate()
  bookingDate: Date;

  @IsBoolean()
  isDeleted: boolean;
}
