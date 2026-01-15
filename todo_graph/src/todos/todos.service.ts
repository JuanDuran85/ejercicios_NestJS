import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { todo } from 'node:test';
import { CreateTodoInput } from './dto';

@Injectable()
export class TodosService {
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
  public findAll(): Todo[] {
    return this.todos;
  }

  public findOne(id: number): Todo | undefined {
    const todoFound: Todo | undefined = this.todos.find(
      (todo) => todo.id === id,
    );

    if (!todoFound) throw new NotFoundException(`Todo with id ${id} not found`);

    return todoFound;
  }

  public createTodo(createTodoInput: CreateTodoInput): Todo {
    const newTodo: Todo = new Todo();
    newTodo.id = Math.max(...this.todos.map((todo: Todo) => todo.id), 0) + 1;
    newTodo.title = createTodoInput.title;
    newTodo.description = createTodoInput.description;

    this.todos.push(newTodo);

    return newTodo;
  }

  public updateTodo() {
    return {};
  }

  public removeTodo() {
    return {};
  }
}
