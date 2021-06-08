import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nick: string

    @Column()
    mensaje: string
}
