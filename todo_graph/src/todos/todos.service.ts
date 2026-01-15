import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      done: true,
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
    {
      id: 4,
      title: 'Todo 4',
      description: 'Description 4',
      done: false,
    },
    {
      id: 5,
      title: 'Todo 5',
      description: 'Description 5',
      done: true,
    },
  ];

  get totalTodosNumber(): number {
    return this.todos.length;
  }

  get completedTodosNumber(): number {
    return this.todos.filter((todo: Todo) => todo.done).length;
  }

  get pendingTodosNumber(): number {
    return this.todos.filter((todo: Todo) => !todo.done).length;
  }

  public findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    if (status !== undefined) {
      return this.todos.filter((todo: Todo) => todo.done === status);
    }
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

  public updateTodo(updateTodoInput: UpdateTodoInput) {
    const { id, description, done, title } = updateTodoInput;
    const todoFound: Todo = this.findOne(updateTodoInput.id)!;

    if (title) todoFound.title = title;
    if (description) todoFound.description = description;
    if (done !== undefined) todoFound.done = done;

    this.todos = this.todos.map((todoMap: Todo) => {
      if (todoMap.id === id) return todoFound;
      return todoMap;
    });

    return todoFound;
  }

  public removeTodo(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    return true;
  }
}
