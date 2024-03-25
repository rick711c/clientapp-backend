import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { RequestValidation } from 'src/lib/authentication/request.validation';
import { TokenService } from 'src/modules/auth/authToken/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(TokenService)
  private tokenService: TokenService;

  constructor(
    private reflector: Reflector
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  
  {

    const header = context.switchToHttp().getRequest().headers;

    //skipping the validation for the controllers where @Public() decorator is used
    const isPublic =  this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
      context.getHandler(),
      context.getClass()
    ]);
    if(isPublic) return true;

    try {
      const requestValidator = new RequestValidation(this.tokenService);
      const user = await requestValidator.validate(header);
      if (user) {
        header.userInfo = user;
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }
}
