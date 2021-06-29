/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mensaje {
    // propidad de manera automatica por la BD
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nick: string

    @Column()
    mensaje: string
}
