import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../iam.constants';
import { ActiveUserData } from '../interfaces';

export const ActivateUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const http: HttpArgumentsHost = ctx.switchToHttp();
    const request: Request = http.getRequest<Request>();

    const user = request[REQUEST_USER_KEY];
    return field ? user![field] : user;
  },
);
