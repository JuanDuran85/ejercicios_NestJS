import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    return registerUserDto;
  }

  public loginUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  public verifyToken() {
    return 'verify token...';
  }
}
