import { SaveAccessTokenDto } from './dto/saveAccessToken.dto';
import { SaveRefreshTokenDto } from './dto/saveRefreshToken.dto';
import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { JwtPayloadInterface } from './interface/jwtPayload.interface';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async generateAccessToken(userDetails: any) {
    try {
      const user: JwtPayloadInterface ={
          userId: userDetails.userId,
          username: userDetails.username,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          phoneNumber: userDetails.phoneNumber,
          email: userDetails.email,
          roles: userDetails.roles
      }
      // Generate access token
      const accessToken = jwt.sign(user, 'your_access_token_secret', {
        expiresIn: '10 days',
      });

      //save metadata
      const accessTokenDto = new SaveAccessTokenDto();
      accessTokenDto.userId = user.userId;
      const now = new Date();
      accessTokenDto.expireDate = new Date(now.getTime() + 240 * 60 * 60 * 1000); 
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
      secretKey = 'your_access_token_secret';
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}
