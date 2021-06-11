/* eslint-disable prettier/prettier */

import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../interfaces/tasks.interface";

export class TaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    
    @IsOptional()
    @IsString()
    search?: string;
}