import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  public create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  public findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Todo {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): string {
    return this.todoService.remove(+id);
  }
}
