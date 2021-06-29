/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../interfaces/task-status.enum';

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
