import { JwtPayload } from './../interfaces/jwt_payload.interface';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UsersRerpository } from '../repositories/users.repository';
import * as bcrypt  from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRerpository)
    private usersRerpository: UsersRerpository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any>{
    return this.usersRerpository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{a_token: string}>{
    const { username, password} = authCredentialsDto;
    const userExist = await this.usersRerpository.findOne({username});

    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const payload: JwtPayload = { username };
      const a_token: string = this.jwtService.sign(payload);
      return { a_token };
    } else {
      throw new UnauthorizedException('No puede ingresar... Revisa los datos');
    }

  }
}