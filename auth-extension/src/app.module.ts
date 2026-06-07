import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CommonModule } from './common/common.module';
import { envs } from './config';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';

const {
  postgresDb,
  postgresHost,
  postgresPassword,
  postgresPort,
  postgresUser,
} = envs;
@Module({
  imports: [
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
