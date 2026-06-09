import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { ApiKeyGuard } from '../api-key/api-key.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private authTypeGuardMap = {} as Record<
    AuthType,
    CanActivate | CanActivate[]
  >;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.ApiKey]: this.apiKeyGuard,
      [AuthType.None]: { canActivate: () => true },
    };
    const authTypes: AuthType[] = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards: CanActivate[] = authTypes.flatMap(
      (type) => this.authTypeGuardMap[type],
    );
    let error: UnauthorizedException = new UnauthorizedException();

    for (const guard of guards) {
      const canActive: boolean | void | Observable<boolean> =
        await Promise.resolve(guard.canActivate(context)).catch((err) => {
          error = err;
        });
      if (canActive) {
        return true;
      }
      error = guard instanceof UnauthorizedException ? guard : error;
    }

    throw error;
  }
}
