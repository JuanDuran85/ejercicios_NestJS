import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { FirstResolveModule } from './first-resolve/first-resolve.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      debug: true,
      graphiql: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    FirstResolveModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
