import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { promisify } from 'node:util';
import { User } from '../../users';
import { ActivateUser } from '../decorators';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Auth } from './decorators/auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { AuthType } from './enums/auth-type.enum';
import { SessionGuard } from './guards/session/session.guard';
import { SessionAuthenticationService } from './session-authentication.service';

@Auth(AuthType.None)
@Controller('session-authentication')
export class SessionAuthenticationController {
  constructor(
    private readonly sessionAuthService: SessionAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  public async signIn(
    @Req() request: Request,
    @Body() signInDto: SignInDto,
  ): Promise<void> {
    const user: User | null = await this.sessionAuthService.signIn(signInDto);
    console.debug(request.logIn);
    if (typeof request.logIn !== 'function') {
      throw new InternalServerErrorException(
        'Passport session not initialized',
      );
    }
    await promisify(request.logIn).call(request, user);
  }

  @UseGuards(SessionGuard)
  @Get()
  public async sayHello(@ActivateUser() user: ActiveUserData): Promise<string> {
    return `Hello, ${user.email}!`;
  }
}
