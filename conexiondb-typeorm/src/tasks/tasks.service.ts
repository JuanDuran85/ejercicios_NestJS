import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAll(userId: number) {
    const getUser = await this.userRepository.findOne(userId);
    if (!getUser) throw new NotFoundException(`Not user found by id ${userId}`);
    return this.taskRepository.find({ user: getUser });
  }

  async findOne(id: number) {
    const getTask = await this.taskRepository.findOne(id);
    if (!getTask) throw new NotFoundException(`Not task found by id ${id}`);
    return getTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const getTask = await this.findOne(id);
    if (!getTask) throw new NotFoundException(`Not task found by id ${id}`);
    const updateTask = this.taskRepository.merge(getTask, updateTaskDto);
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    const getTask = await this.findOne(id);
    if (!getTask) throw new NotFoundException(`Not task found by id ${id}`);
    return this.taskRepository.remove(getTask);
  }
}
