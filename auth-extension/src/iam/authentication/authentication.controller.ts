import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { User } from '../../users';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { SignUpDto } from './dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  public signUp(@Body() signUpDto: SignUpDto): Promise<Partial<User>> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  public async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignUpDto,
  ): Promise<void> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);
    console.debug({ accessToken });
    console.debug({ refreshToken });
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }
}
