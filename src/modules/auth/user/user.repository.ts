import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/lib/entities/user.entity';
import { CreateUserDto } from './dto/cerateUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/lib/enums/errorMessages.enum';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.repository.create(createUserDto);
      let res = await this.repository.save(newUser);
      const { enPassword, ...user } = res;
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

  async getUserIdsByUsernameOrPhoneNo(username?: string, phoneNo?: string) {
    if (!username && !phoneNo) {
      throw new HttpException(
        ErrorMessages.USERNAME_OR_PHONENUMBER_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const query = this.repository.createQueryBuilder().select('userId');

      if (username) {
        query.where('username = :username', { username: username });
      }
      if (phoneNo) {
        query.where('phoneNo = :phoneNo', { phoneNo: phoneNo });
      }
      const res = query.getRawOne();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
