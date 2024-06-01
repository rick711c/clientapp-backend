import { SaveAccessTokenDto } from './dto/saveAccessToken.dto';
import { SaveRefreshTokenDto } from './dto/saveRefreshToken.dto';
import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { CommonRoleService } from '../shared/roleCommon/role-common.service';
import { CommonUserRoleService } from '../shared/userRoleCommon/userRole-common.service';
import { CommonUserService } from '../shared/userCommon/user-common.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly roleCommonService: CommonRoleService,
    private readonly userRoleCommonService: CommonUserRoleService,
    private readonly userCommonService: CommonUserService,
  ) {}

  async generateAccessToken(userDetails: any) {
    try {
      const jwtPayload = {
        userId: userDetails.userId,
      };
      // Generate access token
      const accessToken = jwt.sign(jwtPayload, 'your_access_token_secret', {
        expiresIn: '10 days',
      });

      //save metadata
      const accessTokenDto = new SaveAccessTokenDto();
      accessTokenDto.userId = jwtPayload.userId;
      const now = new Date();
      accessTokenDto.expireDate = new Date(
        now.getTime() + 240 * 60 * 60 * 1000,
      );
      await this.tokenRepository.saveAccessTokenMetadata(accessTokenDto);

      return accessToken;
    } catch (err) {
      throw err;
    }
  }

  async generateRefreshToken(userId: string, length: number = 64) {
    try {
      const refreshToken = randomBytes(length).toString('hex');

      //save token metadata
      const refreshTokenDto = new SaveRefreshTokenDto();
      refreshTokenDto.userId = userId;
      refreshTokenDto.token = refreshToken;
      let expireDate = new Date();
      // Add 7 days to the current date
      expireDate.setDate(expireDate.getDate() + 7);

      refreshTokenDto.expireDate = expireDate;
      await this.tokenRepository.saveRefreshTokenMetadata(refreshTokenDto);

      return refreshToken;
    } catch (err) {
      throw err;
    }
  }

  async validatedRefreshToken(userId: string, refreshToken: string) {
    try {
      const isValid = await this.tokenRepository.validatedRefreshToken(
        userId,
        refreshToken,
      );
      return isValid ? true : false;
    } catch (err) {
      throw err;
    }
  }

  async validateJwtToken(token: string, secretKey?: string): Promise<any> {
    try {
      let userDetails = null;
      secretKey = 'your_access_token_secret';
      const res: any = jwt.verify(token, secretKey);
        console.log(res);

      if (res) {
        userDetails = await this.getUserDetailsByUserId(res.userId);
      }
      return userDetails;
    } catch (error) {
      throw error;
    }
  }

  async getUserDetailsByUserId(userId: string) {
    try {
      const userDetails =
        await this.userCommonService.getUserDetailsById(userId);
      const userRoles = await this.userRoleCommonService.getUserRoles(
        userDetails.userId,
      );
      return { ...userDetails, roles: userRoles };
    } catch (error) {}
  }

  async getUserRoles(userId: string) {
    try {
      const roleIds = await this.userRoleCommonService.getUserRoles(userId);
      let allRoles: any[] = [];
      for (let i = 0; i < roleIds.length; i++) {
        const roleDetails = await this.roleCommonService.findById(
          roleIds[i].roleId,
        );
        allRoles.push(roleDetails);
      }
      console.log(allRoles);
      return allRoles;
    } catch (err) {
      throw err;
    }
  }
}
