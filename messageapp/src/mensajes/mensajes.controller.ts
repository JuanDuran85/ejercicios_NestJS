/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';

@Controller('mensajes')
export class MensajesController {
    @Post() 
    create(@Body() createMensDto: CreateMensajeDto):any{
        console.log(createMensDto);
        return `mensaje creado`;
    }

    @Get()
    getAll():any {
        return `Todos los mensajes`;
    }

    @Put(':id')
    updateMsg(@Body() updateMsgDto: CreateMensajeDto):any{
        console.log(updateMsgDto);
        return `update el mensaje`;
    }

    @Delete()
    deleteMsg():any{
        return `Mensaje eliminado`;
    }
}
