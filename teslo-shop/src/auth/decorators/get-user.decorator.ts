import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    const finalUser: { [key: string]: unknown } = {};

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    if (!data || data?.length === 0) return user;

    if (typeof data === 'string') return user[data];

    for (const property of data) {
      if (user[property]) {
        finalUser[property] = user[property];
      }
    }

    return finalUser;
  },
);
