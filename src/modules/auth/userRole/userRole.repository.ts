import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { AddUserRoleDto } from './dto/addUserRole.dto';
import { UUID } from 'crypto';

export class UserRoleRepository {
  constructor(
    @InjectRepository(UserRole)
    private repository: Repository<UserRole>,
  ) {}

  async addUserRole(createUserRoleDto: AddUserRoleDto) {
    try {
      const newUserRole = this.repository.create(createUserRoleDto);
      return this.repository.save(newUserRole);
    } catch (err) {
      throw err;
    }
  }

  async isUserRoleExist(userId: string, roleId: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('userId', 'roleId')
        .where('userId = :userId', { userId })
        .andWhere('roleId = :roleId', { roleId })
        .getRawOne();

        return res;
    } catch (err) {
      throw err;
    }
  }

  async getUserRoles(userId:string){
    try{
        const res = await this.repository.
        createQueryBuilder()
        .select('roleId')
        .where('userId = :userId', { userId })
        .getRawMany();
        return res;
    }catch (err) {
        throw err;
    }
  }
}
