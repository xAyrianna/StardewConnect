import { Town } from '@StardewConnect/libs/data';
import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const towns = await this.townModel.find().populate('villagersInTown').populate('events').exec();
    return { results: towns };
  }

  async getTownByName(name: string): Promise<{ results: Town }> {
    const town = await this.townModel.findOne({ name }).populate('villagersInTown').populate('events').exec();
    return { results: town };
  }

  async getTownById(id: string): Promise<{ results: Town }> {
    const town = await this.townModel.findById(id).populate('villagersInTown').populate('events').exec();
    return { results: town };
  }

  async addTown(newTown: Town): Promise<TownModel> {
    const createdTown = await new this.townModel(newTown);
    return createdTown.save();
  }

  async updateTown(updatedTown: Town, userId: string): Promise<Town> {
    if (updatedTown.createdBy != userId) {
      throw new ForbiddenException('You are not authorized to update this town');
    }
    const town = await this.townModel
      .findOneAndUpdate({ _id: updatedTown._id }, updatedTown, { new: true })
      .exec();
    const user = await this.userModel.findById(updatedTown.createdBy).exec();
    user.towns = user.towns.map((town) =>
      town._id == updatedTown._id ? updatedTown : town
    );
    await user.save();
    return town;
  }

  async deleteTown(deletedTown: Town, userId: string) {
    if (deletedTown.createdBy != userId) {
      throw new ForbiddenException('You are not authorized to delete this town');
    }
    const town = await this.townModel.deleteOne({ _id: deletedTown._id }).exec();

    for (const event of deletedTown.events) {
      await this.eventModel.deleteOne({ _id: event._id }).exec();
    }
    const user = await this.userModel.findById(deletedTown.createdBy).exec();
    user.towns = user.towns.filter((town) => town._id != deletedTown._id);
    await user.save();
    return town;
  }
}
