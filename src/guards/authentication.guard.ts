import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestValidation } from 'src/lib/authentication/request.validation';
import { TokenService } from 'src/modules/auth/authToken/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(TokenService)
  private tokenService: TokenService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const header = context.switchToHttp().getRequest().headers;
    try {
      const requestValidator = new RequestValidation(this.tokenService);
      const user = requestValidator.validate(header);
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
