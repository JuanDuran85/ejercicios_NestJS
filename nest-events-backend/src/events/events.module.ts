import { EventsController } from './events.controller';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event]),
    ],
    controllers: [EventsController]
})
export class EventsModule {}
