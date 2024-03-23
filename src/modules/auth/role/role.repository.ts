import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/lib/entities/role.entity';
import { CreateRoleDto } from './dto/createRole.dto';

export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const newRole = this.repository.create(createRoleDto);
      return this.repository.save(newRole);
    } catch (err) {
      throw err;
    }
  }


  async findByName(name: string) {
    try {
      const roleDetails = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('name = :name', { name })
        .getRawOne();
        return roleDetails;
    } catch (err) {
      throw err;
    }
  }
}
