import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  public async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<unknown> {
    const { name, password, email } = registerUserDto;

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

      const { name: userName, email: userEmail, id: userId } = newUser;

      return {
        user: {
          name: userName,
          email: userEmail,
          id: userId,
        },
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

  public async loginUser(loginUserDto: LoginUserDto) {
    console.debug({ loginUserDto });
    const { password, email } = loginUserDto;

    try {
      const userFound = await this.userModel.findOne({ email });

      if (!userFound) throw new Error('Invalid credentials');

      const isPasswordValid: boolean = this.bcryptJsAdapter.check(
        password,
        userFound.password,
      );
      
      if (!isPasswordValid) throw new Error('Invalid credentials');

      const { name: userName, email: userEmail, id: userId } = userFound;

      return {
        user: {
          name: userName,
          email: userEmail,
          id: userId,
        },
        token: 'abc-Token',
      };
    } catch (error) {
      const finalError = error as Error;
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: finalError.message,
      });
    }
  }

  public verifyToken() {
    return 'verify token...';
  }
}
