import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return {
      success: true,
      message: 'New user created successfully',
      user: await this.usersService.create(createUserDto),
    };
  }

  @Get()
  async findAll(): Promise<any> {
    return {
      success: true,
      message: 'Users founds successfully',
      user: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return {
      success: true,
      message: 'User found successfully',
      user: await this.usersService.findOne(id),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return {
      success: true,
      message: 'Users update successfully',
      user: await this.usersService.update(id, updateUserDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return {
      success: true,
      message: 'Users delete successfully',
      user: await this.usersService.remove(id),
    };
  }
}
