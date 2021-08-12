import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserInterface } from './interfaces/user.interface';
import { UserEntity } from './model/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: UserInterface): Promise<UserInterface> {
    const { password, password_confirmation } = user;

    if (password !== password_confirmation) {
      throw new BadRequestException('Las claves no son iguales...');
    }

    try {
      const salt = await bcrypt.hash(password, 10);
      return await this.userRepository.save({ ...user, password: salt });
    } catch (error) {
      throw new BadRequestException(`Correo duplicado`);
    }
  }

  async login(userLogin: LoginUserDto): Promise<any> {
    const { email } = userLogin;

    const user = await this.userRepository.findOne({ email });
    console.log(user);

    if (!user || !await bcrypt.compare(userLogin.password, user.password)) throw new BadRequestException('Credenciales incorrectas');
  }
}
