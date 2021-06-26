/* eslint-disable prettier/prettier */
import { Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Controller('tasks')
export class TasksController {
    @Get()
    findTasks(@Query() query: any): string{
        const queryParams = query;
        return `Tasks found ${queryParams.limit}`;
    }

    @Get(':id')
    findOneTask(@Param('id', ParseIntPipe) id:number): string{
        return `Task found by ${id}`;
    }

    @Post()
    createTask(@Body() taskCreateDto: TaskCreateDto): string{
        return `Task created: ${taskCreateDto.description}`;
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): string{
        return `Task deleted by ${id}`;
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() taskUpdateDto: TaskUpdateDto): string{
        return `Task update ${id}, ${taskUpdateDto.description}`;
    }
}
