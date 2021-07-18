import { JwtPayloadInterface } from './jwt-payload.interface';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';

import { AuthRepository } from './auth.repository';
import { SingInDto, SingUpDto } from './dto';
import { User } from '../user/user.entity';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwrService: JwtService,
  ) {}

    async signUp(signUpDto: SingUpDto): Promise<void> {
        const {username, email} = signUpDto;
        const userExist = await this._authRepository.findOne({where: [{username},{email}]});
        if (userExist) {
            throw new ConflictException('User already exist');
        }

        return this._authRepository.signup(signUpDto);
    }

    async signIn(signInDto: SingInDto): Promise<{token:string}>{
        const {username, password} = signInDto;
        const user: User = await this._authRepository.findOne({where: {username}});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatchPass = await compare(password, user.password);

        if (!isMatchPass) {
            throw new UnauthorizedException('Invalit credentials');
        }

        const payload: JwtPayloadInterface = {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(role => role.name as RoleType),
        }

        const token = this._jwrService.sign(payload);

        return {token};
    }
}
