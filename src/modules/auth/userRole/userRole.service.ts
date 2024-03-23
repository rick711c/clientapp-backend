import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from './userRole.repository';
import { AddUserRoleDto } from './dto/addUserRole.dto';
import { UUID } from 'crypto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleService: RoleService,
  ) {}

  async addUserRole(createUserRoleDto: AddUserRoleDto) {
    try {
      return this.userRoleRepository.addUserRole(createUserRoleDto);
    } catch (err) {
      throw err;
    }
  }

  async addUserRoleByRoleName(userId: string, roleName: string) {
    try {
      const roleDetails = await this.roleService.findByName(roleName);
      await this.addUserRole({ userId: userId, roleId: roleDetails.roleId });
      return roleDetails
    } catch (err) {
      throw err;
    }
  }

  async isUserRoleExist(userId: string, roleName: string) {
    try {
      const roleDetails = await this.roleService.findByName(roleName);
      const isUserRoleExist = await this.userRoleRepository.isUserRoleExist(
        userId,
        roleDetails.roleId,
      );
      if (isUserRoleExist) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log('isUserRoleExist function execution failed');
      throw err;
    }
  }

  async getUserRoles(userId: string){
    try{
       const roleIds = await this.userRoleRepository.getUserRoles(userId);
       let allRoles: any[] = [];
        for(let i=0; i<roleIds.length; i++){
            const roleDetails = await this.roleService.findByName(roleIds[i].roleId);
            allRoles.push(roleDetails);
        }
        return allRoles;
    }catch (err) {
        throw err;
    }
  }

}
