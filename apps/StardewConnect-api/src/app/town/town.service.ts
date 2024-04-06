import { Town } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';
import { Town as TownModel, TownDocument } from './schemas/town.schema';
import { Event as EventModel, EventDocument } from '../event/schemas/event.schema'
import { User as UserModel, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TownService {

  constructor(
    @InjectModel(TownModel.name) private townModel: Model<TownDocument>, @InjectModel(EventModel.name) private eventModel: Model<EventDocument>, @InjectModel(UserModel.name) private userModel: Model<UserDocument>
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
    const user = await this.userModel.findById(deletedTown.createdBy).exec();
    user.towns = user.towns.filter((town) => town._id != deletedTown._id);
    await user.save();
    return await this.townModel.deleteOne({ _id: deletedTown._id }).exec();
  }
}
