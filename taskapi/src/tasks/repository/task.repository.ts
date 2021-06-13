/* eslint-disable prettier/prettier */

import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatus } from '../interfaces/task-status.enum';
import { User } from 'src/auth/entities/user.entity';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {

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

        const taskFound = await query.getMany();
        return taskFound;
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
