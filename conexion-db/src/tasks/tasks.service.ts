import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@Inject('DB') private client: Client) {}

  create(createTaskDto: CreateTaskDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query(
        'INSERT INTO tasks (name, description, status) VALUES ($1, $2, $3)',
        [createTaskDto.name, createTaskDto.description, createTaskDto.status],
        (error) => {
          if (error) reject(error);
          resolve(`Task created successfully`);
        },
      );
    });
  }

  findAll(): Promise<CreateTaskDto[]> {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT * FROM tasks', (error, result) => {
        if (error) reject(error);
        resolve(result.rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.client.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id],
        (error, result) => {
          if (error) reject(error);
          if (result.rows.length >= 1) {
            resolve(result.rows);
          } else {
            reject(new NotFoundException(`No existe tareas para el id: ${id}`));
          }
        },
      );
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query(
        'UPDATE tasks SET name = $1, description = $2, status = $3 WHERE id = $4',
        [
          updateTaskDto.name,
          updateTaskDto.description,
          updateTaskDto.status,
          id,
        ],
        (error) => {
          if (error) reject(error);
          resolve(`Task update successfully`);
        },
      );
    });
  }

  remove(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.query('DELETE from tasks WHERE id = $1', [id], (error) => {
        if (error) reject(error);
        resolve(`Task deleted successfully`);
      });
    });
  }
}
