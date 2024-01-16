import { Town } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';
import {Town as TownModel, TownDocument} from './schemas/town.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TownService {
    towns: Town[] = [
      {
        id: 1,
        name: 'Stardrop Town',
        capacity: 6,
        facilities: [
          'General Store',
          'Hospital',
          'Joja Mart',
          'Saloon',
          'Museum',
        ],
        creationDate: new Date('June 5, 1980'),
      },
      {
        id: 2,
        name: 'Fairhaven',
        capacity: 10,
        facilities: ['General Store', 'Hospital', 'Animal Shop', 'Saloon'],
        creationDate: new Date('January 15, 1958'),
      },
      {
        id: 3,
        name: 'Emerald City',
        capacity: 5,
        facilities: [
          'General Store',
          'Hospital',
          'Joja Mart',
          'Saloon',
          'Museum',
        ],
        creationDate: new Date('April 02, 2002'),
      },
      {
        id: 4,
        name: 'Blue Moon Town',
        capacity: 15,
        facilities: [
          'General Store',
          'Hair Dresser',
          'Bakery',
          'Saloon',
          'Smith',
        ],
        creationDate: new Date('August 30, 2009'),
      },
    ];
    constructor(
      @InjectModel(TownModel.name) private townModel: Model<TownDocument>
    ) {}
      
    async getAll(): Promise<{ results: Town[]}> {
      const towns = await this.townModel.find().exec();
      console.log("Database returns: ", towns);
      return { results: towns};
    }
  
    async getTownByName(name: string): Promise<{ results: Town}> {
      const town = await this.townModel.findOne({ name }).exec();
      return { results: town };
    }

    async getTownById(id: number): Promise<{ results: Town}> {
      const town = await this.townModel.findById(id).exec();
      return { results: town };
    }
  
    async addTown(newTown: Town): Promise<TownModel> {
      const createdTown = await new this.townModel(newTown);
      return createdTown.save();
    }
  
    async updateTown(updatedTown: Town): Promise<Town> {
      const town = await this.townModel.findOneAndUpdate({id: updatedTown.id}, updatedTown, {new: true}).exec();
      return town;
    }
  
    async deleteTown(deletedTown: Town) {
      return await this.townModel.deleteOne({ id: deletedTown.id }).exec();
    }
  }
  
