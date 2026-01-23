import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation('', { name: "signin" })
  public async signup(): Promise<unknown> {
    return this.authService.signup()
  }

  @Mutation('', { name: "login" })
  public async login(): Promise<unknown> {
    return this.authService.login()
  }

  @Query('', { name: "revalidate" })
  public async revalidateToken(): Promise<unknown> {
    return this.authService.revalidateToken()
  }



}
