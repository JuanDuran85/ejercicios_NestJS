import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return {
      status: 'Ok',
      messages: 'Task created successfully',
      tasks: await this.tasksService.create(createTaskDto),
    };
  }

  @Get('/user/:id')
  async findAll(@Param('id', ParseIntPipe) id: number) {
    return {
      status: 'Ok',
      messages: 'Task found successfully',
      tasks: await this.tasksService.findAll(id),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      status: 'Ok',
      messages: 'Task found successfully',
      tasks: await this.tasksService.findOne(id),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return {
      status: 'Ok',
      messages: 'Task updated successfully',
      tasks: await this.tasksService.update(id, updateTaskDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      status: 'Ok',
      messages: 'Task deleted successfully',
      tasks: await this.tasksService.remove(+id),
    };
  }
}
