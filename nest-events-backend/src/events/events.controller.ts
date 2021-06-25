/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode, ParseIntPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Like, MoreThan, Repository } from 'typeorm';

@Controller('/events')
export class EventsController {

    private readonly logger = new Logger(EventsController.name);

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ){}

    @Get()
    async findAll(){
        this.logger.log("Activando el metodo findAll");
        const event = await this.repository.find();
        this.logger.debug(`Encontrados ${event.length} eventos`);
        return event;
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'when', 'name'],
            where: [{
                id  : MoreThan(3),
                when: MoreThan(new Date('2021-02-18T00:00:00.000Z'))
            }, {
                description: Like('%meet%')
            }],
            take: 2,
            order: {
                name: 'DESC'
            }
        })
    }
    
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: any ){
        console.log(id);
        console.log(typeof id);
        
        const event = await this.repository.findOne(Number(id));
        if (!event) {
            throw new NotFoundException(`No se encontro nada para ese id: ${id}`);
        }
        return event;
    }
    
    @Post()
    async create(@Body() input: CreateEventDto){
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }
    
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateEventDto){
        const event = await this.repository.findOne(id);
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }
    
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseIntPipe) id: number ){
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);
    }
}
