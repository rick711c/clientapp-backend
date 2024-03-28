import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class SaveOTPDto {
  @IsString()
  phoneNo: string;

  @IsString()
  otp: string;

  @IsOptional()
  @IsString()
  enOTP: string;

  @IsDate()
  expiryTime: Date;

  @IsOptional()
  @IsNumber()
  isUsed:number;

  constructor() {
    this.expiryTime = this.generateExpiryTime(20);
  }

  generateExpiryTime(expireInterval: number): Date {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + expireInterval * 60000); // 2 minutes in milliseconds
    return expiryTime;
  }
}
