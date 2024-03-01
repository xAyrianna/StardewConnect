import { Town } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';
import { Town as TownModel, TownDocument } from './schemas/town.schema';
import { Event as EventModel, EventDocument } from '../event/schemas/event.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TownService {
  // towns: Town[] = [
  //   {
  //     id: 1,
  //     name: 'Stardrop Town',
  //     capacity: 6,
  //     facilities: [
  //       'General Store',
  //       'Hospital',
  //       'Joja Mart',
  //       'Saloon',
  //       'Museum',
  //     ],
  //     creationDate: new Date('June 5, 1980'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Fairhaven',
  //     capacity: 10,
  //     facilities: ['General Store', 'Hospital', 'Animal Shop', 'Saloon'],
  //     creationDate: new Date('January 15, 1958'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Emerald City',
  //     capacity: 5,
  //     facilities: [
  //       'General Store',
  //       'Hospital',
  //       'Joja Mart',
  //       'Saloon',
  //       'Museum',
  //     ],
  //     creationDate: new Date('April 02, 2002'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Blue Moon Town',
  //     capacity: 15,
  //     facilities: [
  //       'General Store',
  //       'Hair Dresser',
  //       'Bakery',
  //       'Saloon',
  //       'Smith',
  //     ],
  //     creationDate: new Date('August 30, 2009'),
  //   },
  // ];
  constructor(
    @InjectModel(TownModel.name) private townModel: Model<TownDocument>, @InjectModel(EventModel.name) private eventModel: Model<EventDocument>
  ) {}

  async getAll(): Promise<{ results: Town[] }> {
    const towns = await this.townModel.find().populate('events').exec();
    console.log('Database returns: ', towns);
    return { results: towns };
  }

  async getTownByName(name: string): Promise<{ results: Town }> {
    const town = await this.townModel.findOne({ name }).exec();
    return { results: town };
  }

  async getTownById(id: string): Promise<{ results: Town }> {
    const town = await this.townModel.findById(id).exec();
    return { results: town };
  }

  async addTown(newTown: Town): Promise<TownModel> {
    newTown.createdBy = null;
    const createdTown = await new this.townModel(newTown);
    return createdTown.save();
  }

  async updateTown(updatedTown: Town): Promise<Town> {
    const town = await this.townModel
      .findOneAndUpdate({ _id: updatedTown._id }, updatedTown, { new: true })
      .exec();
    return town;
  }

  async deleteTown(deletedTown: Town) {
    for (const event of deletedTown.events) {
      await this.eventModel.deleteOne({ _id: event._id }).exec();
    }
    return await this.townModel.deleteOne({ _id: deletedTown._id }).exec();
  }
}
