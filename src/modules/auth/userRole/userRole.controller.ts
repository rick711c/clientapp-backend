import { Body, Controller, Post } from "@nestjs/common";
import { UserRoleService } from "./userRole.service";
import { AddUserRoleDto } from "./dto/addUserRole.dto";

@Controller('/userRole')
export class UserRoleController{
    constructor(private readonly userRoleService: UserRoleService) {}
  
    @Post('/')
    async addUserRole(@Body() createUserRoleDto: AddUserRoleDto) {
      try {
        return this.userRoleService.addUserRole(createUserRoleDto);
      } catch (e) {
        throw e;
      }
    }
  }