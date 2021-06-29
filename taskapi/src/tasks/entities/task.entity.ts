/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { TaskStatus } from "../interfaces/task-status.enum";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type) => User, user => user.tasks, {eager: false})
    @Exclude({toPlainOnly: true})
    user: User;
}