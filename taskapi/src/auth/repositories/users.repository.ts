/* eslint-disable prettier/prettier */

import { EntityRepository } from "typeorm";
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt  from 'bcrypt';

@EntityRepository(User)
export class UsersRerpository extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<any>{
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const newPass = await bcrypt.hash(password,salt);

        const newUser = this.create({
            username, 
            password: newPass
        });
        try {
            await this.save(newUser);
            return `Ok`
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`El usuario ${username} ya se encuentra registrado`);
            } else {
                throw new InternalServerErrorException(`Contacta al administrador`);
            }
        }
    }
}