import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class SaveAccessTokenDto {
  @IsOptional()
  @IsUUID()
  tokenId: string;

  @IsUUID()
  userId: string;

  @IsDateString()
  expireDate: Date;
}
