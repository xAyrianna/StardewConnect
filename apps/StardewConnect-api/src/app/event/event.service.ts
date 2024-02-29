import { Injectable } from '@nestjs/common';
import { Event } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Event as EventModel, EventDocument } from './schemas/event.schema';
import { Town as TownModel, TownDocument } from '../town/schemas/town.schema';

@Injectable()
export class EventService {
  // events: Event[] = [
  //   {
  //     id: 1,
  //     name: 'Luau',
  //     description:
  //       'A pot luck event where villagers bring something to contribute to the pan!',
  //     date: 'Summer 11',
  //     location: 'Beach',
  //     hasHappened: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Spirit's Eve",
  //     description:
  //       "An evening full of spooky events. There's a labyrinth, finish it and maybe there's a price...",
  //     date: 'Fall 27',
  //     location: "Town's square",
  //     hasHappened: true,
  //   },
  //   {
  //     id: 3,
  //     name: 'Feast of the Winter Star',
  //     description:
  //       'A feast where everybody from town enjoys dinner together and participate to the secret gift-giving',
  //     date: 'Winter 25',
  //     location: "Town's square",
  //     hasHappened: false,
  //   },
  //   {
  //     id: 4,
  //     name: 'Flower dance',
  //     description:
  //       "Every year there's a flower dance. It's tradition. It's possible to dance with the bachelors and bachelorettes.",
  //     date: 'Spring 24',
  //     location: 'Forest',
  //     hasHappened: false,
  //   },
  // ];
  constructor(
    @InjectModel(EventModel.name) private eventModel: Model<EventDocument>,
    @InjectModel(TownModel.name) private townModel: Model<TownDocument>
  ) {}

  async getAll(): Promise<{ results: Event[] }> {
    const events = await this.eventModel.find().populate('inTownId').exec();
    console.log('Database returns: ', events);
    return { results: events };
  }

  async getEventByName(name: string): Promise<{ results: Event }> {
    const event = await this.eventModel.findOne({ name }).exec();
    return { results: event };
  }

  async addEvent(createdEventDto: Event): Promise<EventModel> {
    console.log('Creating ' + createdEventDto);
    const createdEvent = await new this.eventModel(createdEventDto);
    return createdEvent.save();
  }

  async updateEvent(updatedEvent: Event): Promise<Event> {
    const event = await this.eventModel
      .findOneAndUpdate({ _id: updatedEvent._id }, updatedEvent, { new: true })
      .exec();
    console.log('Updating ' + event);
    return event;
  }
  async deleteEvent(deletedEvent: Event) {
    console.log('Deleting ' + deletedEvent._id);
    const town = await this.townModel.findById(deletedEvent.inTownId).exec();
    console.log('Town: ', town);
    town.events = town.events.filter(
      (event) => (event._id! = deletedEvent._id)
    );
    console.log('Events: ', town.events);
    await town.save();
    return await this.eventModel.deleteOne({ _id: deletedEvent._id }).exec();
  }
}
