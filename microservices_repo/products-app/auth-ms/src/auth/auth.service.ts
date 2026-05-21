import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { User } from './schemas';

@Injectable()
export class AuthService {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    return await this.userModel.create(registerUserDto);
  }

  public loginUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  public verifyToken() {
    return 'verify token...';
  }
}
