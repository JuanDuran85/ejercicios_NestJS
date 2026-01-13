import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      done: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      done: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      description: 'Description 3',
      done: true,
    },
  ];

  public create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  public findAll(): Todo[] {
    return this.todos;
  }

  public findOne(id: number): Todo {
    const todoFound: Todo | undefined = this.todos.find(
      (todo) => todo.id === id,
    );

    if (!todoFound) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todoFound;
  }

  public update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  public remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
