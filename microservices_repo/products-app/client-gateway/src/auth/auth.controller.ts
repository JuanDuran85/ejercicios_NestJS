import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  public registerUser() {
    return 'register user';
  }

  @Post('login')
  public loginUser() {
    return 'login user';
  }

  @Get('verify')
  public verifyUser() {
    return 'verify user';
  }
}
