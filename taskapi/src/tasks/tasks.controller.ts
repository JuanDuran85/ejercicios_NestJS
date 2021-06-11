/* eslint-disable prettier/prettier */

import { Res, HttpStatus, Patch, Put } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './interfaces/tasks.interface';
import { TasksService } from './services/tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tastService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.tastService.getAllTasks();
    }

    @Get(':id')
    getAllTasksById(@Param('id') id: string): Task{
        return this.tastService.getAllTasksById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.tastService.createTasks(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id:string, @Res() response: any):string{
        const result: string = this.tastService.deleteTask(id);
        return response.status(HttpStatus.OK).json({result});
    }

    @Put(':id')
    updateTask(@Body() createTaskDto: CreateTaskDto, @Param('id') id: string): Task{
        return this.tastService.updateTask(id,createTaskDto);
    }

    @Patch(':id')
    updateStatusTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus): Task {
        return this.tastService.updateStatusTask(id,status);
    }
}
