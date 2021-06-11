/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../interfaces/tasks.interface';

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
