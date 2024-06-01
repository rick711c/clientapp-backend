import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/lib/entities/role.entity';
import { User } from 'src/lib/entities/user.entity';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { Repository } from 'typeorm';

export class CommonRoleRepository {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async findById(roleId: string) {
    try {
      const roleDetails = await this.repository
        .createQueryBuilder('r')
        .select('*')
        .where('r."roleId" = :roleId', { roleId })
        .getRawOne();
      return roleDetails;
    } catch (err) {
      throw err;
    }
  }
}
