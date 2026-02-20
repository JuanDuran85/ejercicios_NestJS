import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (roles: unknown[], context: ExecutionContext) => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const userFound = ctx.getContext().req.user;

    if (!userFound)
      throw new InternalServerErrorException(
        'User not found (request) - make sure you are authenticated',
      );

    return userFound;
  },
);
