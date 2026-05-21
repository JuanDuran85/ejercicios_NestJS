import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from '../config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsClient: ClientProxy,
  ) {}

  @Post('register')
  public registerUser() {
    return this.natsClient
      .send('auth.register.user', { msg: 'message from register-client' })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Post('login')
  public loginUser() {
    return this.natsClient
      .send('auth.login.user', { msg: 'message from login-client' })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get('verify')
  public verifyUser() {
    return this.natsClient
      .send('auth.verify.user', { msg: 'message from verify-client' })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
