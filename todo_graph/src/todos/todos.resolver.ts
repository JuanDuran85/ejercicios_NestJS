import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput } from './dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { StatusArgs } from './dto/args/status.args';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos', description: 'return all todos' })
  public findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todosService.findAll(statusArgs);
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

  @Mutation(() => Boolean, { name: 'removeTodo' })
  public removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.removeTodo(id);
  }
}
