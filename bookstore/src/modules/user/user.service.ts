import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './../role/role.entity';
import { UserDetails } from './user.details.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { MapperService } from '../../shared/mapper.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { getConnection } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _mapperService: MapperService,
  ) {}

    async get(id: number): Promise<UserDto>{
      
        if (!id) {
            throw new BadRequestException('el id debe existir');
        }
        
        const user: User = await this._userRepository.findOne(id, {
            where: {status: 'ACTIVE'}
        });

        if (!user) {
            throw new NotFoundException('el usuario no existe');
        }

        return this._mapperService.map<User, UserDto>(user, new UserDto());
    }

    async getAll(): Promise<UserDto[]>{
       
        const usersAll: User[] = await this._userRepository.find({
            where: {status: 'ACTIVE'}
        });

        if (usersAll.length === 0) {
            throw new NotFoundException('no se encontraron usuarios');
        }

        return this._mapperService.mapCollection<User, UserDto>(usersAll, new UserDto());
    }

    async create(user: User): Promise<UserDto>{
        const details = new UserDetails();
        user.details = details;
        const repo = getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}});
        user.roles = [defaultRole];
        const savedUser: User = await this._userRepository.save(user);
        return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
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
