import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./cerateUser.dto";
import { IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
 
    @IsString()
    userId:string;
}