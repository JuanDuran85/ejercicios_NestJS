import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './../role/role.entity';
import { UserDetails } from './user.details.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { getConnection } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

    async get(id: number): Promise<User>{
      
        if (!id) {
            throw new BadRequestException('el id debe existir');
        }
        
        const user: User = await this._userRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if (!user) {
            throw new NotFoundException('el usuario no existe');
        }

        return user;
    }

    async getAll(): Promise<User[]>{
       
        const usersAll: User[] = await this._userRepository.find({
            where: {status: 'ACTIVE'}
        });

        if (usersAll.length === 0) {
            throw new NotFoundException('no se encontraron usuarios');
        }

        return usersAll;
    }

    async create(user: User): Promise<User>{
        const details = new UserDetails();
        user.details = details;
        const repo = getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}});
        user.roles = [defaultRole];
        const savedUser: User = await this._userRepository.save(user);
        return savedUser;
    }

    async update(id: number, user: User): Promise<string>{
        await this._userRepository.update(id, user);
        return 'UPDATED';
    }

    async delete(id: number): Promise<string>{
        const userExist: User = await this._userRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if (!userExist) {
            throw new NotFoundException('el usuario no existe');
        }

        await this._userRepository.update(id, {status: 'INACTIVE'});
        return 'DELETED';
    }
}
