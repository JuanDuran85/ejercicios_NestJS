import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';

@Injectable()
export class AuthService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  public registerUser() {
    return 'register user...'
  }

  public loginUser() {
    return 'login user...';
  }

  public verifyToken() {
    return 'verify token...';
  }
}
