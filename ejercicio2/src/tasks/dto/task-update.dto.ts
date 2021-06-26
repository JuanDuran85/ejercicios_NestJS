/* eslint-disable prettier/prettier */
import { TaskCreateDto } from './task-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class TaskUpdateDto extends PartialType(TaskCreateDto) {}
