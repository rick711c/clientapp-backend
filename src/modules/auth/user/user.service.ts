import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/cerateUser.dto';
import { UserRoleService } from '../userRole/userRole.service';
import { ErrorMessages } from 'src/lib/enums/errorMessages.enum';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleService: UserRoleService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const userDetails = await this.userRepository.isUserExist(
        createUserDto.email,
        createUserDto.phoneNumber,
      );

      if (userDetails) {
        const isUserRoleExist = await this.userRoleService.isUserRoleExist(
          userDetails.userId,
          createUserDto.role,
        );
        if (!isUserRoleExist) {
         const roleDetails = await this.userRoleService.addUserRoleByRoleName(
            userDetails.userId,
            createUserDto.role,
          );
          return {userDetails,roleDetails}
        } 
        else {
          throw new HttpException(
            ErrorMessages.USER_ROLE_ALREADY_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
        
      } else {
        createUserDto.enPassword = await this.hashPassword(
          createUserDto.password,
        );
        const newUser = await this.userRepository.registerUser(createUserDto);
        const addRole = await this.userRoleService.addUserRoleByRoleName(
          newUser.userId,
          createUserDto.role,
        );

        return {...newUser,roles:{...addRole}}; 
      }

    } catch (err) {
      throw err;
    }
  }


  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds to generate
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async getUserDetailsById(userId: string) {
    try {
      const userDetails = await this.userRepository.getUserDetailsById(userId);
      const userRoles  = await this.userRoleService.getUserRoles(userDetails.userId);
      return {userDetails, userRoles};
    } catch (err) {
      throw err;
    }
  }
}
