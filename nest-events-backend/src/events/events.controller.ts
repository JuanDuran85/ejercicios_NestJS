/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Patch, Post, Body, HttpCode } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Controller('/events')
export class EventsController {

    private events: Event[] = [];

    @Get()
    findAll(){
        return this.events;
    }
    
    @Get(':id')
    findOne(@Param('id') id: string ){
        return this.events.find(eventID => eventID.id === parseInt(id));
    }
    
    @Post()
    create(@Body() input: CreateEventDto){
        const event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1
        };
        this.events.push(event);
        return event;
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() input: UpdateEventDto){
        const index = this.events.findIndex(event => event.id === parseInt(id));
        this.events[index] = {
            ...this.events[index],
            ...input,
            when: input.when ? new Date(input.when) : this.events[index].when
        };
        return this.events[index];
    }
    
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string ){
        this.events = this.events.filter(eventID => eventID.id !== parseInt(id));
    }
}
