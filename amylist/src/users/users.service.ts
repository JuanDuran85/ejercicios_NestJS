import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupInput } from '../auth/dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser: User = this.userRepository.create(signupInput);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error(String(error));
      throw new BadRequestException('Something went wrong');
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
}
