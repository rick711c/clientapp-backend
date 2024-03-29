// checkupDay.dto.ts
import { IsUUID, IsString, IsOptional } from 'class-validator';

export class AddCheckupDayDto {
  @IsOptional()
  @IsUUID()
  dayId: string;

  @IsString()
  checkupDay: string;

  @IsUUID()
  clinicId: string;
}
