/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskCreateDto } from '../dto/task-create.dto';
import { TaskUpdateDto } from '../dto/task-update.dto';
import { TasksEntity } from '../entity/tasks.entity';

@Injectable()
export class TaskService {
  private tasks: TasksEntity[] = [
    {
      id: 1,
      description: 'Tarea número 1',
      done: false,
      date: '2017-01-01',
    },
  ];

  findTasks(query: any): TasksEntity[] {
    console.log(query);
    return this.tasks;
  }

  findOneTask(id: number): TasksEntity {
    const findTask: TasksEntity = this.tasks.find((tarea) => tarea.id === id);
    if (!findTask) {
      throw new NotFoundException(`No se encontro la tarea por id ${id}`);
    }
    return findTask;
  }

  createTask(data: TaskCreateDto): TasksEntity {
    const newTask: TasksEntity = { id: this.tasks.length + 1, ...data };
    this.tasks.unshift(newTask);
    return newTask;
  }

  deleteTask(id: number): string {
    const findTask: TasksEntity = this.findOneTask(id);
    if (findTask) {
      this.tasks = this.tasks.filter((tarea) => tarea.id !== id);
    }
    return `deleted task with ${id}`;
  }

  updateTask(id: number, data: TaskUpdateDto): TasksEntity {
    const findTaskIndex: number = this.tasks.findIndex(
      (value) => value.id === id,
    );
    if (findTaskIndex === -1)
      throw new NotFoundException(`No existe tarea para el id: ${id}`);
    this.tasks[findTaskIndex] = { ...this.tasks[findTaskIndex], ...data };
    return this.tasks[findTaskIndex];
  }
}
