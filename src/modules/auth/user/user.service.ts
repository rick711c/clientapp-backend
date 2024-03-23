import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/cerateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(createUserDto:CreateUserDto){
    try{
       return this.userRepository.registerUser(createUserDto);
    }
    catch(err){
        throw err;
    }
}
}
