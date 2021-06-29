/* eslint-disable prettier/prettier */

import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatus } from '../interfaces/task-status.enum';
import { User } from '../../auth/entities/user.entity';


@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {
    private logger = new Logger('TasksRepository', true);
    async getTasks(taskFilterDto: TaskFilterDto, user: User): Promise<TaskEntity[]> {
        const { status, search } = taskFilterDto;
        const query = this.createQueryBuilder('task');
        query.where({user});
        
        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%`})
        }

        try {
            const taskFound = await query.getMany();
            return taskFound;
        } catch (error) {
            this.logger.error(`error en la conexion para el usuario ${user.username}`,error.stack);
            throw new InternalServerErrorException(`Contacta al administrador`);
            
        }
    }

    async createTasks(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
        const { title, description } = createTaskDto;
        const newTask = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(newTask)

        return newTask;
    }
}
