import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/entities/user.entity';
import { CreateUserDto } from './dto/cerateUser.dto';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.repository.create(createUserDto);
      let res = await this.repository.save(newUser);
      const {enPassword,...user}=res;
      return res;
    } catch (err) {
      throw err;
    }
  }

  async isUserExist(email: string, phoneNumber: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('email = :email', { email: email })
        .orWhere('phoneNumber = :phoneNumber', { phoneNumber })
        .getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getUserDetailsById(userId: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('*')
        .where('userId = :userId', { userId: userId })
        .getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getUserIdsByUsername(username: string) {
    try {
      const res = await this.repository
        .createQueryBuilder()
        .select('userId')
        .where('username = :username', { username: username })
        .getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
