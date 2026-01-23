import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto';
import { AuthResponse } from './types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  public async signup(signupInput: SignupInput): Promise<AuthResponse> {
    console.debug({
      signupInput,
    });
    return {
      token: 'token',
      user: {} as User,
    };
  }

  public async login(): Promise<unknown> {
    return null;
  }

  public async revalidateToken(): Promise<unknown> {
    return null;
  }
}
