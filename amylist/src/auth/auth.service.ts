import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptJsAdapter } from '../common/adapters';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginInput, SignupInput } from './dto';
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptJsAdapter: BcryptJsAdapter,
  ) {}

  public async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user: User = await this.userService.create(signupInput);
    return {
      token: 'token21234',
      user,
    };
  }

  public async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    console.debug({ loginInput });
    const userFound: User = await this.userService.findOneByEmail(email);
    console.debug({ userFound });
    if (!this.bcryptJsAdapter.check(password, userFound.password))
      throw new BadRequestException('Credentials are not valid');

    return {
      token: 'token21234',
      user: userFound,
    };
  }

  public async revalidateToken(): Promise<unknown> {
    return null;
  }
}
