import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/cerateUser.dto";

@Controller('/user')
export class UserController{
    constructor(private readonly userService: UserService) {}
  
    @Post('/')
    async createPa(@Body() createUserDto: CreateUserDto) {
      try {
        return this.userService.registerUser(createUserDto);
      } catch (e) {
        throw e;
      }
    }
  }