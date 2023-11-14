import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@StardewConnect/libs/data';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('event')
@ApiTags('Event')
export class EventController {
    constructor(private readonly eventService: EventService){}

    @Get()
    @ApiResponse({ status: 200, description: 'List of events' })
    getAll(){
      return this.eventService.getAll();
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Event by id' })
    getEventByUsername(@Param('id') name: string) {
      return this.eventService.getEventByName(name);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Event created successfully' })
    addEvent(@Body() event: Event) {
      this.eventService.addEvent(event);
    }
  
    @Put()
    @ApiResponse({ status: 200, description: 'Event updated successfully' })
    updateEvent(@Body() updatedEvent: Event) {
      this.eventService.updateEvent(updatedEvent);
    }
  
    @Delete()
    @ApiResponse({ status: 204, description: 'Event deleted successfully' })
    deleteEvent(@Body() deletedEvent: Event) {
      this.eventService.deleteEvent(deletedEvent);
    }
}

