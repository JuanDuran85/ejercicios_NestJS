import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserInterface } from './interfaces/user.interface';
import { UserEntity } from './model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserInterface): Promise<UserInterface> {
    const { password, password_confirmation } = user;

    if (password !== password_confirmation) {
      throw new BadRequestException('Las claves no son iguales...');
    }

    const salt = await bcrypt.hash(password, 10);

    try {
        return await this.userRepository.save({ ...user, password: salt });
    } catch (error) {
        throw new BadRequestException(`Correo duplicado`);
    }
  }
}
