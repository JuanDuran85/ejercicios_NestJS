/* eslint-disable prettier/prettier */
import {
  Body,
  Param,
  Query,
  ParseIntPipe,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApiTags } from "@nestjs/swagger";

import configFile from '../config';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { TaskService } from './service/tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
    @Inject(configFile.KEY)
    private configFileService: ConfigType<typeof configFile>,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findTasks(@Query() query: any): any {
    console.log(this.configFileService.secretKey);
    return {
      success: true,
      message: 'Tasks founds',
      tasks: this.taskService.findTasks(query),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneTask(@Param('id', ParseIntPipe) id: number): any {
    return {
      success: true,
      message: 'Task found',
      tasks: this.taskService.findOneTask(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() taskCreateDto: TaskCreateDto): any {
    return {
      success: true,
      message: 'Task create successfully',
      tasks: this.taskService.createTask(taskCreateDto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteTask(@Param('id', ParseIntPipe) id: number): any {
    return {
      success: true,
      message: 'Task deleted successfully',
      task: this.taskService.deleteTask(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskUpdateDto: TaskUpdateDto,
  ): any {
    return {
      success: true,
      message: 'Task updated successfully',
      task: this.taskService.updateTask(id, taskUpdateDto),
    };
  }
}
