/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from 'typeorm';
import { Event } from "./event.entity";

@Entity()
export class Attendee {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name: string;

    @ManyToOne(() => Event, (event)=>event.attendees,{
        nullable: false
    })
    @JoinColumn({
        name:'event_id',
    })
    event: Event;
}