import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  public registerUser(){
    return 'register user...';
  }

    @MessagePattern('auth.login.user')
  public loginUser(){
    return 'register user...';
  }

    @MessagePattern('auth.verify.user')
  public verifyToken(){
    return 'verify user...';
  }
}
