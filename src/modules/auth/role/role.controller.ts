import { Body, Controller, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/createRole.dto";

@Controller('/role')
export class RoleController{
    constructor(private readonly roleService: RoleService) {}
  
    @Post('/')
    async createPa(@Body() createRoleDto: CreateRoleDto) {
      try {
        return this.roleService.createRole(createRoleDto);
      } catch (e) {
        throw e;
      }
    }
  }