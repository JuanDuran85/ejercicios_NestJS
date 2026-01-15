import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FirstResolveResolver {
  @Query(() => String, {
    description: 'first resolve message',
    name: 'firstResolve01',
  })
  public firstResolve() {
    return 'first resolve';
  }

  @Query(() => Float, { name: 'RandomNumber' })
  public getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'random from zero to',
    nullable: true,
    defaultValue: 6,
  })
  public getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true, defaultValue: 6 })
    to: number = 6,
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }
}
