import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@StardewConnect/libs/data';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService){}

    @Get()
    getAll(){
      return this.eventService.getAll();
    }
  
    @Get(':id')
    getEventByUsername(@Param('id') name: string) {
      return this.eventService.getEventByName(name);
    }
    @Post()
    addEvent(@Body() event: Event) {
      this.eventService.addEvent(event);
    }
  
    @Put()
    updateEvent(@Body() updatedEvent: Event) {
      this.eventService.updateEvent(updatedEvent);
    }
  
    @Delete()
    deleteEvent(@Body() deletedEvent: Event) {
      this.eventService.deleteEvent(deletedEvent);
    }
}

