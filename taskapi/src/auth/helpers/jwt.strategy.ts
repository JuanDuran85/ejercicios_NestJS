/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './../interfaces/jwt_payload.interface';
import { User } from '../entities/user.entity';
import { UsersRerpository } from './../repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRerpository)
        private usersRerpository: UsersRerpository){
            super({
                secretOrKey: 'ejemplo1234',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            })
        }
    
    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const userFound: User = await this.usersRerpository.findOne({username});
        if (!userFound){
            throw new UnauthorizedException(`No puede ingresar`);
        }

        return userFound;
    }
}