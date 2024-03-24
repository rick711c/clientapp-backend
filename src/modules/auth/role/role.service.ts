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

  async findByName(name: string) {
    try {
      return this.roleRepository.findByName(name);
    } catch (err) {
      throw err;
    }
  }

  async findById(roleId: string) {
    try {
      return this.roleRepository.findById(roleId);
    } catch (err) {
      throw err;
    }
  }
}
