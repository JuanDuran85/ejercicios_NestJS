import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    console.debug(data);
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user)
      throw new InternalServerErrorException('User not found (request)');
    return user;
  },
);
