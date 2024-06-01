import { Injectable } from '@nestjs/common';
import { CommonUserRoleRepository } from './userRole-common.repository';


@Injectable()
export class CommonUserRoleService {
  constructor(private readonly repo: CommonUserRoleRepository) {}
  async getUserRoles(userId: string){
    try{
       const roleIds = await this.repo.getUserRoles(userId);
       let allRoles: any[] = [];
        for(let i=0; i<roleIds.length; i++){
            // const roleDetails = await this.roleService.findById(roleIds[i].roleId);
            // allRoles.push(roleDetails);
        }
        console.log(allRoles);
        return allRoles;
    }catch (err) {
        throw err;
    }
  }
}
