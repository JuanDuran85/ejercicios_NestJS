import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptJsAdapter } from '../common';
import { NATS_SERVICE } from '../config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { User } from './schemas';

@Injectable()
export class AuthService {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly bcryptJsAdapter: BcryptJsAdapter,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;

    try {
      const userFound = await this.userModel.findOne({ email });

      if (userFound) {
        throw new Error('User already exists');
      }

      const newUser = await this.userModel.create({
        email,
        name,
        password: this.bcryptJsAdapter.hash(password),
      });

      const { password: __, ...rest } = newUser;

      return {
        user: rest,
        token: 'abc-Token',
      };
    } catch (error) {
      const finalError = error as Error;
      throw new RpcException({
        status: 400,
        message: finalError.message,
      });
    }
  }

  public loginUser(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  public verifyToken() {
    return 'verify token...';
  }
}
