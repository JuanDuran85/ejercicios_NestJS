import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees';
import { CommonModule } from './common';
import { envs } from './config';
import { IamModule } from './iam';
import { UsersModule } from './users';
import { ConfigModule } from '@nestjs/config';

const {
  postgresDb,
  postgresHost,
  postgresPassword,
  postgresPort,
  postgresUser,
} = envs;
@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: postgresHost,
      port: +postgresPort,
      username: postgresUser,
      password: postgresPassword,
      database: postgresDb,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: 'debug',
    }),
    IamModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
