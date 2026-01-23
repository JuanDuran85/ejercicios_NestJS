import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SignupInput } from '../auth/dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser: User = this.userRepository.create(signupInput);
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  public async findAll(): Promise<User[]> {
    return [];
  }

  public async findOne(id: string): Promise<User> {
    return {} as User;
  }

  public async block(id: string): Promise<User> {
    return {} as User;
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      this.logger.error(error.detail);
      throw new BadRequestException(error.detail);
    }
    
    this.logger.fatal(String(error));
    throw new InternalServerErrorException(
      'Something went wrong. Please check server logs',
    );
  }
}
