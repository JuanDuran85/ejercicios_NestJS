/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskFilterDto } from './../dto/tasks-filter.dto';
import { Task, TaskStatus } from '../interfaces/tasks.interface';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
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
    }
}