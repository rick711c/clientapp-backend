import { Injectable } from '@nestjs/common';
import { CommonUserRepository } from './user-common.repository';

@Injectable()
export class CommonUserService {
  constructor(private readonly repo: CommonUserRepository) {}
  async getUserDetailsById(userId: string) {
    try {
      const userDetails = await this.repo.getUserDetailsById(userId);
      return userDetails;
    } catch (err) {
      throw err;
    }
  }
}
