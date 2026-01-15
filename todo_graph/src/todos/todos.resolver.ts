import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoInput, UpdateTodoInput } from './dto';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos', description: 'return all todos' })
  public findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Query(() => Todo, {
    name: 'todo',
    nullable: false,
    description: 'return a todo by id',
  })
  public findOne(
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ): Todo | undefined {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  public createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  public updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.updateTodo(updateTodoInput);
  }

  public removeTodo() {
    return null;
  }
}
