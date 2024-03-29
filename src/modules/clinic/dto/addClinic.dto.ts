import { IsArray, IsInt, IsJSON, IsOptional, IsString } from 'class-validator';
import { ClinicAddress } from 'src/lib/interfaces/index.interface';

export class AddClinicDto {
  @IsString()
  clinicName: string;

  @IsJSON()
  address: ClinicAddress;

  @IsOptional()
  @IsString()
  checkupDays: string;

}
