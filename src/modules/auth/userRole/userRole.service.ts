import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from './userRole.repository';
import { AddUserRoleDto } from './dto/addUserRole.dto';

@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async addUserRole(createUserRoleDto: AddUserRoleDto) {
    try {
      return this.userRoleRepository.addUserRole(createUserRoleDto);
    } catch (err) {
      throw err;
    }
  }
}
