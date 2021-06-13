import { UseGuards } from '@nestjs/common';
/* eslint-disable prettier/prettier */

import { Body, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './services/tasks.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskFilterDto } from './dto/tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tastService: TasksService){}

    @Get()
    getTasks(@Query() taskFilterDto: TaskFilterDto): Promise<TaskEntity[]>{
        return this.tastService.getAllTasks(taskFilterDto);
    }

    @Get(':id')
    getAllTasksById(@Param('id') id: string): Promise<TaskEntity>{
        return this.tastService.getAllTasksById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity>{
        return this.tastService.createTasks(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id:string): Promise<any>{
        return this.tastService.deleteTask(id);
    }

    @Patch(':id')
    updateStatusTask(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<TaskEntity> {
        return this.tastService.updateStatusTask(id,updateTaskStatusDto.status);
    }


    /* @Get()
    getTasks(@Query() taskFilterDto: TaskFilterDto): Task[]{

        if (Object.keys(taskFilterDto).length) {
            return this.tastService.getTasksByFilter(taskFilterDto);
        } else {
            return this.tastService.getAllTasks();
        }
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
        @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        return this.tastService.updateStatusTask(id,updateTaskStatusDto.status);
    } */
}
