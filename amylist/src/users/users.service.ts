import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
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
