/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task, TaskStatus } from '../interfaces/tasks.interface';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getAllTasksById(id:string): Task {
        return this.tasks.find(tastId => tastId.id === id);
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
        const index = this.tasks.findIndex(taskIndex => taskIndex.id === id);
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
    }
}