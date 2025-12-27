import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public create(@Body() createUserDto: CreateUserDto): Promise<unknown> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  public loginUser(@Body() loginUserDto: LoginUserDto): Promise<unknown> {
    return this.authService.login(loginUserDto);
  }
}
