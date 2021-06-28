import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const userFound = await this.userRepository.findOne(id);
    if (!userFound) throw new NotFoundException(`Not user found by id: ${id}`);
    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const getUser = await this.findOne(id);
    const updateuserDto = this.userRepository.merge(getUser, updateUserDto);
    await this.userRepository.save(updateuserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<string> {
    const getUser = await this.findOne(id);
    await this.userRepository.remove(getUser);
    return `This action removes a #${id} user`;
  }
}
