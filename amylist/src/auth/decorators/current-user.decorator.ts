import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { ValidRoles } from '../enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[], context: ExecutionContext) => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const userFound = ctx.getContext().req.user as User;

    if (!userFound)
      throw new InternalServerErrorException(
        'User not found (request) - make sure you are authenticated',
      );

    if (roles.length === 0) return userFound;

    for (const roleUser of userFound.roles) {
      if (roles.includes(roleUser as ValidRoles)) return userFound;
    }

    throw new ForbiddenException(
      `User ${userFound.fullName} need a valid role: [${roles}]`,
    );
  },
);
