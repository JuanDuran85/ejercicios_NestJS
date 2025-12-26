import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    try {
      const user: User = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handlerDbError(error);
    }
  }

  private handlerDbError(error: unknown): never {
    //@ts-ignore
    if (error!.code === '23505') throw new BadRequestException(error.detail);

    console.error(String(error));

    throw new InternalServerErrorException(
      ' Unexpected error, check server logs',
    );
  }
}
