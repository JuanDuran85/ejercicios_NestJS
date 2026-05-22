import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import type { Request } from 'express';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsClient: ClientProxy,
  ) {}

  @Post('register')
  public registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.natsClient.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Post('login')
  public loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.natsClient.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  public verifyUser(@Req() req: Request) {
    console.debug(req.headers);
    const user = req['user'];
    const token = req['token'];
    console.debug({
      user,
      token,
    });
    return {
      user,
      token,
    };
    /* return this.natsClient
      .send('auth.verify.user', { msg: 'message from verify-client' })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      ); */
  }
}
