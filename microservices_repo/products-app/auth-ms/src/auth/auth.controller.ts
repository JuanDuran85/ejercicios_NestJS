import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  public registerUser() {
    return this.authService.registerUser();
  }

  @MessagePattern('auth.login.user')
  public loginUser() {
    return this.authService.loginUser();
  }

  @MessagePattern('auth.verify.user')
  public verifyToken() {
    return this.authService.verifyToken();
  }
}
