import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RawDecorator } from '../common/decorators/raw-headers.decorator';
import { AuthService } from './auth.service';
import { AuthUser, GetUser, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth User')
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

  @Get('check-status')
  @UseGuards(AuthGuard())
  public checkAuthStatus(@GetUser() user: User): Promise<unknown> {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  public testingPrivateRoute(
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

  @Get('private2')
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  public testingPrivateRouteTwo(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  public testingPrivateRouteThree(@GetUser() user: User) {
    return {
      ok: true,
      message: 'testing private route 3',
      user,
    };
  }

  @Get('private4')
  @AuthUser(ValidRoles.admin)
  public testingPrivateRouteFour(@GetUser() user: User) {
    return {
      ok: true,
      message: 'testing private route 4',
      user,
    };
  }
}
