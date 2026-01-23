import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto';
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user: User = await this.userService.create(signupInput);
    console.debug({ user });
    return {
      token: 'token21234',
      user,
    };
  }

  public async login(): Promise<unknown> {
    return null;
  }

  public async revalidateToken(): Promise<unknown> {
    return null;
  }
}
