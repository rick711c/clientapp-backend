import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/entities/user.entity';
import { Repository } from 'typeorm';

export class CommonUserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async getUserDetailsById(userId: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('"userId" = :userId', { userId: userId })
        .getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
