import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const getUser = await this.userService.findOne(createTaskDto.user);
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: getUser,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async findAll(userId: number): Promise<TaskEntity[]> {
    const getUser = await this.userService.findOne(userId);
    return this.taskRepository.find({ user: getUser });
  }

  async findOne(id: number): Promise<TaskEntity> {
    const getTask = await this.taskRepository.findOne(id, {
      relations: ['user'],
    });
    if (!getTask) throw new NotFoundException(`Not task found by id ${id}`);
    return getTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<string> {
    const getTask = await this.findOne(id);
    const getUser = await this.userService.findOne(getTask.user.id);
    const updateTask = this.taskRepository.merge(getTask, {
      ...updateTaskDto,
      user: getUser,
    });
    await this.taskRepository.save(updateTask);
    return `This action updates a #${id} task`;
  }

  async remove(id: number): Promise<TaskEntity> {
    const getTask = await this.findOne(id);
    return this.taskRepository.remove(getTask);
  }
}
