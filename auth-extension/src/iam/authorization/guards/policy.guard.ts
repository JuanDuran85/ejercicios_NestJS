import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from '../../iam.constants';
import { ActiveUserData } from '../../interfaces';
import { POLICIES_KEY } from '../decorators/policies.decorator';
import { PolicyHandler } from '../policies/interfaces/policy-handler.interface';
import { Policy } from '../policies/interfaces/policy.interface';
import { PolicyHandlerStorage } from '../policies/policy-handlers.storage';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const policies: Policy[] = this.reflector.getAllAndOverride<Policy[]>(
      POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (policies) {
      const user: ActiveUserData = context.switchToHttp().getRequest()[
        REQUEST_USER_KEY
      ];
      await Promise.all(
        policies.map((policy: Policy) => {
          const policyHandler: PolicyHandler<any> =
            this.policyHandlerStorage.get(policy.constructor as Type);
          return policyHandler.handle(policy, user);
        }),
      ).catch((error: Error) => {
        throw new ForbiddenException(error.message);
      });
    }

    return true;
  }
}
