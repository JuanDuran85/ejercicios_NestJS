/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from '../dto/create-mensaje-dto';
import { Mensaje } from './../entities/mensaje.entity';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensaje) private readonly mensajeRepo: Repository<Mensaje>
    ){}

    async getAll(): Promise<Mensaje[]>{
        return await this.mensajeRepo.find()
    }

    async createMsg(mensajeNew: CreateMensajeDto): Promise<Mensaje>{
        const nuevoMsg = new Mensaje();
        nuevoMsg.mensaje = mensajeNew.message;
        nuevoMsg.nick = mensajeNew.nick;
        return this.mensajeRepo.save(nuevoMsg)
    }

    async updateMsg(id:number,mensajeUpdate: CreateMensajeDto): Promise<Mensaje>{
        const mensajeActualizar = await this.mensajeRepo.findOne(id);
        mensajeActualizar.mensaje = mensajeUpdate.message;
        mensajeActualizar.nick = mensajeUpdate.nick;

        return this.mensajeRepo.save(mensajeActualizar);
    }

    async deleteMsg(id:number): Promise<any>{
        return await this.mensajeRepo.delete(id);
    }
}