import { Injectable } from '@nestjs/common';
import { CommonRoleRepository } from './role-common.repository';


@Injectable()
export class CommonRoleService {
  constructor(private readonly repository: CommonRoleRepository) {}
  async findById(roleId: string) {
    try {
    return this.repository.findById(roleId);
    } catch (err) {
      throw err;
    }
  }
}
