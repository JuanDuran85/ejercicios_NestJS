import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';

@Injectable()
export class AuthService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  public registerUser() {
    return this.natsClient.send('auth.register', {}).pipe();
  }

  public loginUser() {
    return 'register user...';
  }

  public verifyToken() {
    return 'register user...';
  }
}
