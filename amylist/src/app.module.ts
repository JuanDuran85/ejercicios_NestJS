import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ItemsModule } from './items/items.module';
import { ListsModule } from './lists';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { ListItemModule } from './list-item/list-item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        debug: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context({ req }) {
          const token: string = req.headers.authorization?.replace(
            'Bearer ',
            '',
          );
          const payload = jwtService.decode(token);
          //if (!token) throw new Error('Invalid token. Token not found');
          //if (!payload) throw new Error('Invalid token. Payload not found');
          //return { user: payload };
        },
      }),
    }),
    /* GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      debug: true,
      graphiql: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }), */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT! || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: 'debug',
    }),
    ItemsModule,
    UsersModule,
    AuthModule,
    CommonModule,
    SeedModule,
    ListsModule,
    ListItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
