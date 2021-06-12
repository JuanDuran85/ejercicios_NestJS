/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajeService } from './services/mensaje.service';

@Controller('mensajes')
export class MensajesController {
    
    constructor(private mensajesSeervice: MensajeService){}

    @Post() 
    create(@Body() createMensDto: CreateMensajeDto, @Res() res: any):any{
        console.log(createMensDto);
        this.mensajesSeervice.createMsg(createMensDto).then(resp => {
            res.status(HttpStatus.CREATED).json(resp)
        }).catch(error => {
            console.log(error)
            res.status(HttpStatus.FORBIDDEN).json({error: "error al crear un mensaje"});
        })
    }

    @Get()
    getAll(@Res() res:any):any {
       this.mensajesSeervice.getAll().then(resp =>{
            res.status(HttpStatus.OK).json(resp);
       }).catch(error => {
            console.log(error);
            res.status(HttpStatus.BAD_REQUEST).json({msg: "error en al solicitud"})
       })
    }

    @Put(':id')
    updateMsg(@Body() updateMsgDto: CreateMensajeDto, @Res() res: any, @Param('id') idMsg: any):any{
        console.log(updateMsgDto);
        this.mensajesSeervice.updateMsg(idMsg,updateMsgDto).then(resp => {
            res.status(HttpStatus.OK).json(resp);
        }).catch(error => {
            console.log(error);
            res.status(HttpStatus.BAD_REQUEST).json({msg: 'error al actualizar'});
        })
    }

    @Delete(':id')
    deleteMsg(@Res() res: any, @Param('id') idMsg: any):any{
        this.mensajesSeervice.deleteMsg(idMsg).then(resp =>{
            res.status(HttpStatus.OK).json(resp);
        }).catch(error =>{
            console.log(error);
            res.status(HttpStatus.BAD_REQUEST).json({msg: "error al intentar borrar"});
        })
    }
}
