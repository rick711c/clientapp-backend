import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from 'os';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userInfo = request.headers['userInfo'];
    return userInfo
  },
)