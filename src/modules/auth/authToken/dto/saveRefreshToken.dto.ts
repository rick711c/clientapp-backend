import { IsUUID, IsString, IsOptional, IsDate } from 'class-validator';

export class SaveRefreshTokenDto {
  @IsOptional()
  @IsUUID()
  tokenId: string;

  @IsUUID()
  userId: string;

  @IsString()
  token: string;

  @IsDate()
  expireDate: Date;

}
