/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TaskService } from './service/tasks.service';
import { TasksController } from './tasks.controller';

@Module({
    providers: [TaskService],
    controllers: [TasksController]
})
export class TasksModule {}
