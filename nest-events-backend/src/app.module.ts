/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './events/entities/event.entity';
import { EventsController } from './events/events.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres1234',
      database: 'postgres',
      entities: [Event],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Event])
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
