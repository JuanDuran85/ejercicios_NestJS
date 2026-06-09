import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../../users/enums/roles.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { REQUEST_USER_KEY } from '../../iam.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!contextRoles) return true;

    const user = context.switchToHttp().getRequest()[REQUEST_USER_KEY];
    return contextRoles.includes(user.role)
  }
}
