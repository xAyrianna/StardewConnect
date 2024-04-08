import { ForbiddenException, Injectable } from '@nestjs/common';
import { Event } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Event as EventModel, EventDocument } from './schemas/event.schema';
import { Town as TownModel, TownDocument } from '../town/schemas/town.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventModel.name) private eventModel: Model<EventDocument>,
    @InjectModel(TownModel.name) private townModel: Model<TownDocument>
  ) {}

  async getAll(): Promise<{ results: Event[] }> {
    const events = await this.eventModel.find().populate('inTownId').exec();
    return { results: events };
  }

  async getEventByName(name: string): Promise<{ results: Event }> {
    const event = await this.eventModel.findOne({ name }).exec();
    return { results: event };
  }

  async getEventsByCreator(userId: string): Promise<{ results: Event[] }> {
    const allEvents = await this.getAll();
    const userEvents: Event[] = [];

    for (const event of allEvents.results) {
      if (event.inTownId) {
        const town = await this.townModel.findById(event.inTownId).exec();
        if (town?.createdBy == userId) {
          userEvents.push(event);
        }
      }
    }
    return { results: userEvents };
  }

  async addEvent(createdEventDto: Event, userId: string): Promise<EventModel> {
    const town = await this.townModel.findById(createdEventDto.inTownId).exec();
    if (town?.createdBy != userId) {
      throw new ForbiddenException(
        'You are not authorized to add an event to this town'
      );
    }
    const createdEvent = await new this.eventModel(createdEventDto);
    return createdEvent.save();
  }

  async updateEvent(updatedEvent: Event, userId: string): Promise<Event> {
    const town = await this.townModel.findById(updatedEvent.inTownId).exec();
    if (town?.createdBy != userId) {
      throw new ForbiddenException(
        'You are not authorized to update this event'
      );
    }
    const event = await this.eventModel
      .findOneAndUpdate({ _id: updatedEvent._id }, updatedEvent, { new: true })
      .exec();
    town.events = town.events.map((event) =>
      event._id == updatedEvent._id ? updatedEvent : event
    );
    console.log('Updating ' + event);
    return event;
  }
  async deleteEvent(deletedEvent: Event, userId: string) {
    const town = await this.townModel.findById(deletedEvent.inTownId).exec();
    if (town?.createdBy != userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this event'
      );
    }
    const event = await this.eventModel
      .deleteOne({ _id: deletedEvent._id })
      .exec();
    town.events = town.events.filter((event) => event._id != deletedEvent._id);
    await town.save();
    return event;
  }
}
