// checkupHour.dto.ts
import { IsUUID, IsString, IsOptional, IsNumber } from 'class-validator';

export class AddCheckupHourDto {
  @IsOptional()
  @IsUUID()
  hourId: string;

  @IsString()
  checkupHour: string;

  @IsUUID()
  dayId: string;

  @IsNumber()
  slots: number;
}
