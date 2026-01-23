import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto';
import { AuthResponse } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  public async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  /* @Mutation('', { name: "login" })
  public async login(): Promise<unknown> {
    return this.authService.login()
  }

  @Query('', { name: "revalidate" })
  public async revalidateToken(): Promise<unknown> {
    return this.authService.revalidateToken()
  } */
}
