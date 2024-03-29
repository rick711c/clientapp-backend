import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/cerateUser.dto';
import { UserRoleService } from '../userRole/userRole.service';
import { ErrorMessages } from 'src/lib/enums/errorMessages.enum';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { UtilService } from 'src/lib/utils/util.service';
import { TokenService } from '../authToken/token.service';
import { UserRole } from 'src/lib/entities/userRole.entity';
import { LoginMethod, UserRolesEnum } from 'src/lib/enums';
import { Public } from 'src/decorators/public.decorator';
import { OTPService } from '../otp/otp.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleService: UserRoleService,
    private readonly utilService: UtilService,
    private readonly tokenService: TokenService,
    private readonly otpService: OTPService,
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
          return { userDetails, roleDetails };
        } else {
          throw new HttpException(
            ErrorMessages.USER_ROLE_ALREADY_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {

        //if user is login using otp, no need to do anything with password
        if (createUserDto.password) {
          createUserDto.enPassword = await this.utilService.hashPassword(
            createUserDto.password,
          );
          createUserDto.username = createUserDto.username || createUserDto.email;
        }

        const newUser = await this.userRepository.registerUser(createUserDto);
        const addRole = await this.userRoleService.addUserRoleByRoleName(
          newUser.userId,
          createUserDto.role,
        );

        return { ...newUser, roles: { ...addRole } };
      }
    } catch (err) {
      throw err;
    }
  }

  async getUserDetailsById(userId: string) {
    try {
      const userDetails = await this.userRepository.getUserDetailsById(userId);
      const userRoles = await this.userRoleService.getUserRoles(
        userDetails.userId,
      );
      return { ...userDetails, roles: userRoles };
    } catch (err) {
      throw err;
    }
  }

  async login(credentials: LoginDto) {
    try {
      let userDetails: any;
      if (credentials.loginMethod === LoginMethod.PASSWORD_BASED) {
        userDetails = await this.validateUserByPassword(credentials);
      } else {
        userDetails = await this.validateUserByOTP(credentials);
      }

      // Generate access token
      const accessToken =
        await this.tokenService.generateAccessToken(userDetails);
      const refreshToken = await this.tokenService.generateRefreshToken(
        userDetails.userId,
      );
      return {
        ...userDetails,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }

  async validateUserByPassword(credentials: LoginDto) {
    try {
      //find the user by the username
      const userId = await this.userRepository.getUserIdsByUsernameOrPhoneNo(
        credentials.username,
      );
      if (!userId) {
        throw new HttpException(
          ErrorMessages.INVALID_CREDENTIAL,
          HttpStatus.BAD_REQUEST,
        );
      }
      const userDetails = await this.getUserDetailsById(userId);
      //compare the password
      const isPasswordsMatch: boolean = await this.utilService.comparePasswords(
        credentials.password,
        userDetails.enPassword,
      );
      if (!isPasswordsMatch) {
        throw new HttpException(
          ErrorMessages.WRONG_PASSWORD,
          HttpStatus.UNAUTHORIZED,
        );
      }
      return userDetails;
    } catch (err) {
      throw err;
    }
  }

  async validateUserByOTP(credentials: LoginDto) {
    try {
      const phoneNo = credentials.phoneNo;
      const otp = credentials.otp;

      //verify otp
      const isOtpVerified = await this.otpService.verifyOTP(phoneNo, otp);
      if (!isOtpVerified) {
        throw new HttpException(
          ErrorMessages.INVALID_OTP,
          HttpStatus.BAD_REQUEST,
        );
      }

      //checking if the user present in out user db
      let userId =
        await this.userRepository.getUserIdsByUsernameOrPhoneNo(phoneNo);
      if (!userId) {
        //if user not exist, then create user with minimum info
        let createUserDto = new CreateUserDto();
        createUserDto.phoneNumber = phoneNo;
        const newUser = await this.userRepository.registerUser(createUserDto);
        userId = newUser.userId;
        const role = await this.userRoleService.addUserRoleByRoleName(userId,UserRolesEnum.CUSTOMER)
        
      }
      const userDetails = await this.getUserDetailsById(userId);
      return userDetails;
    } catch (err) {
      throw err;
    }
  }

  async generateAccessTokenByRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    try {
      const isValid = await this.tokenService.validatedRefreshToken(
        userId,
        refreshToken,
      );
      if (!isValid) {
        throw new HttpException(
          ErrorMessages.INVALID_TOKEN,
          HttpStatus.BAD_REQUEST,
        );
      }
      const userDetails = await this.getUserDetailsById(userId);
      const accessToken =
        await this.tokenService.generateAccessToken(userDetails);
      return accessToken;
    } catch (err) {
      throw err;
    }
  }
}
