/* eslint-disable prettier/prettier */

/* import { v4 as uuid} from 'uuid'; */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../interfaces/task-status.enum';
import { TasksRepository } from '../repository/task.repository';
import { TaskEntity } from '../entities/task.entity';
import { TaskFilterDto } from '../dto/tasks-filter.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository){}

    getAllTasks(taskFilterDto: TaskFilterDto, user: User): Promise<TaskEntity[]> {
        return this.tasksRepository.getTasks(taskFilterDto, user);
    }

    async getAllTasksById(id:string, user: User): Promise<TaskEntity> {
        const found = await this.tasksRepository.findOne({where: {id, user} });
        if (!found) throw new NotFoundException(`Task with the id: ${id} not found`);
        return found;
    }

    createTasks(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
        return this.tasksRepository.createTasks(createTaskDto, user);
    }

    async deleteTask(id:string, user: User): Promise<any>{
        const result = await this.tasksRepository.delete({id, user});
        if (result.affected === 0) {
            throw new NotFoundException(`Task with the id: ${id} not found`);
        }
        return `The task with the id: ${id} was deleted successfully.`;
    }

    async updateStatusTask(id: string, status: TaskStatus, user: User): Promise<TaskEntity> {
        const taskToUpdate = await this.getAllTasksById(id, user);
        taskToUpdate.status = status;
        await this.tasksRepository.save(taskToUpdate);
        return taskToUpdate;
    }


/*     private tasks: Task[] = []; */

/*     getAllTasks(): Task[] {
        return this.tasks;
    }

    getAllTasksById(id:string): Task {
        const found = this.tasks.find(tastId => tastId.id === id);
        if (!found) throw new NotFoundException(`Task with the id: ${id} not found`);
        return found;
    }

    getTasksByFilter(taskFilterDto: TaskFilterDto): Task[]{
        const { status , search } = taskFilterDto;
        
        let taskTemp: Task[] = this.getAllTasks();

        if (status) {
            taskTemp = taskTemp.filter(result => result.status === status);
        }
        
        if (search) {
            taskTemp = taskTemp.filter(result => {
                if (result.title.toLowerCase().includes(search.toLowerCase()) || result.description.toLowerCase().includes(search.toLowerCase())) {
                    return true
                };

                return false;
            })
        }
        return taskTemp;  
    }

    createTasks(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(id:string): string{
        const found = this.getAllTasksById(id);
        const index = this.tasks.findIndex(taskIndex => taskIndex.id === found.id);
        this.tasks.splice(index,1);
        return `The task with the id: ${id} was deleted successfully.`;
    }

    updateTask(id: string, createTaskDto: CreateTaskDto): Task {
        const taskToUpdate = this.getAllTasksById(id);
        taskToUpdate.title = createTaskDto.title;
        taskToUpdate.description = createTaskDto.description;
        return taskToUpdate;
    }

    updateStatusTask(id: string, status: TaskStatus): Task {
        const taskToUpdate = this.getAllTasksById(id);
        taskToUpdate.status = status;
        return taskToUpdate;
    } */
}