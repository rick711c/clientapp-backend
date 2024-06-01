import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { Repository } from 'typeorm';

export class CommonUserRoleRepository {
  constructor(
    @InjectRepository(UserRole)
    private repository: Repository<UserRole>,
  ) {}

  async getUserRoles(userId:string){
    try{
        const res = await this.repository.
        createQueryBuilder('r')
        .select('r."roleId"')
        .where('r."userId" = :userId', { userId })
        .getRawMany();
        return res;
    }catch (err) {
        throw err;
    }
  }
}
