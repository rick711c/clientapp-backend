// checkupHour.dto.ts
import { IsUUID, IsString } from 'class-validator';

export class AddCheckupHourDto {
  @IsUUID()
  hourId: string;

  @IsString()
  checkupHour: string;

  @IsUUID()
  dayId: string;

  @IsString()
  slots: number;
}
