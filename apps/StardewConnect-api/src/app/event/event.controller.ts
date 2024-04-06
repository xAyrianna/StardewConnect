import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@StardewConnect/libs/data';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('event')
@ApiTags('Event')
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of events' })
  getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Event by id' })
  getEventByName(@Param('id') name: string) {
    return this.eventService.getEventByName(name);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  addEvent(@Body() event: Event, @InjectToken() token: Token){
    this.eventService.addEvent(event, token.sub);
  }

  @Put()
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  updateEvent(@Body() updatedEvent: Event, @InjectToken() token: Token){
    this.eventService.updateEvent(updatedEvent, token.sub);
  }

  @Delete()
  @ApiResponse({ status: 204, description: 'Event deleted successfully' })
  deleteEvent(@Body() deletedEvent: Event, @InjectToken() token: Token){
    this.eventService.deleteEvent(deletedEvent, token.sub);
  }
}
