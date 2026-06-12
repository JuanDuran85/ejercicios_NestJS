import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../../users';
import { ActiveUserData } from '../../interfaces';

export class UserSerializer extends PassportSerializer {
  public serializeUser(user: User, done: Function): void {
    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  }
  public async deserializeUser(
    payload: ActiveUserData,
    done: Function,
  ): Promise<void> {
    done(null, payload);
  }
}
