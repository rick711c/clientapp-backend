import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./cerateUser.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}