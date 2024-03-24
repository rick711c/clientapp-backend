import { SaveAccessTokenDto } from './dto/saveAccessToken.dto';
import { SaveRefreshTokenDto } from './dto/saveRefreshToken.dto';
import { Controller, Get, Header, Injectable, Post, Query } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Controller('/token')
export class TokenController {
  constructor(private readonly tokeService: TokenService) {}

  // @Post('/accessToken')
  // async createAndSaveAccessTokenMetadata(accessTokeDto:SaveAccessTokenDto){
  //     try{

  //         return this.tokeService.generateAccessToken(accessTokeDto)
  //     }catch(err){
  //         throw err;
  //     }
  // }

  // @Post('/refreshToken')
  // async createAndSaveRefreshToken(refreshTokeDto:SaveRefreshTokenDto){
  //     try{
  //         return this.tokeService.generateRefreshToken(refreshTokeDto)

  //     }catch(err){
  //         throw err;
  //     }
  // }
  @Get('/validateJwtToken')
  async validateJwtToken(@Query('token') token: string): Promise<any> {
    try {
      return this.tokeService.validateJwtToken(token);
    } catch (error) {
      throw error;
    }
  }
}
