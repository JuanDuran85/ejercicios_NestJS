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

  public create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = new Todo();
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.done = false;

    this.todos.push(todo);

    return todo;
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
    const todoFound: Todo | undefined = this.findOne(id);
    const {
      description = undefined,
      done = undefined,
      title = undefined,
    } = updateTodoDto;

    if (title) {
      todoFound.title = title;
    }

    if (description) {
      todoFound.description = description;
    }

    if (done !== undefined) {
      todoFound.done = done;
    }

    this.todos = this.todos.map((todoMap: Todo) => {
      if (todoMap.id === id) return todoFound;

      return todoMap;
    });

    return todoFound;
  }

  public remove(id: number): string {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return `Todo with id ${id} removed`;
  }
}
