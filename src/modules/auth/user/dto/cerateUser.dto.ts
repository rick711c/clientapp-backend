import { IsUUID, IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserRolesEnum } from 'src/lib/enums';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  enPassword: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserRolesEnum)
  role: string;

  constructor() {
    this.fullName = this.fullName ? this.fullName : 'Guest';
    this.role = this.role ? this.role : UserRolesEnum.CUSTOMER;
  }
}
