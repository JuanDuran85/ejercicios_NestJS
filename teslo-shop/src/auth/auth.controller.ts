import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RawDecorator } from '../common/decorators/raw-headers.decorator';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

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

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser(['email', 'fullName', 'roles']) user: User,
    @GetUser('email') userEmail: string,
    @RawDecorator() rawHeaders: string[],
  ) {
    return {
      ok: true,
      user,
      userEmail,
      rawHeaders,
    };
  }
}
