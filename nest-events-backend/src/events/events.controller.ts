/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { Like, MoreThan, Repository } from 'typeorm';

@Controller('/events')
export class EventsController {

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ){}

    @Get()
    async findAll(){
        return await this.repository.find();
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
                id: 'DESC'
            }
        })
    }
    
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number ){
        return await this.repository.findOne(id);
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
