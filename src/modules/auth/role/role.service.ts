import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      return this.roleRepository.createRole(createRoleDto);
    } catch (err) {
      throw err;
    }
  }
}
