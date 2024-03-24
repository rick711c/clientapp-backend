import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ErrorMessages } from '../enums/errorMessages.enum';
import { TokenService } from 'src/modules/auth/authToken/token.service';


export class RequestValidation {
    constructor(
        private readonly tokenService: TokenService
    ){}
  async validate(header: any) {
    const authHeader = header.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(ErrorMessages.FORBIDDEN, HttpStatus.UNAUTHORIZED);
    }
    const token = this.extractToken(authHeader);

    const user = await this.tokenService.validateJwtToken(token);
    return user;
  }

  extractToken(authHeader: string) {
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      // If the Authorization header format is incorrect, return null
      return null;
    }
    return token;
  }
}
