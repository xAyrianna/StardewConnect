import { ForbiddenException, Injectable } from '@nestjs/common';
import { Gender, LifeStage, Villager } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Villager as VillagerModel,
  VillagerDocument,
} from './schemas/villager.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { villagerCypher } from './neo4j/villager.cypher';
import { User as UserModel, UserDocument } from '../user/schemas/user.schema';
import { Town as TownModel, TownDocument } from '../town/schemas/town.schema';

@Injectable()
export class VillagerService {
  constructor(
    @InjectModel(VillagerModel.name)
    private villagerModel: Model<VillagerDocument>,
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @InjectModel(TownModel.name) private townModel: Model<TownDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<{ results: Villager[] }> {
    const villagers = await this.villagerModel.find().exec();
    return { results: villagers };
  }

  async getVillagerByName(name: string): Promise<{ results: Villager }> {
    const villager = await this.villagerModel.findOne({ name }).exec();
    return { results: villager };
  }

  async addVillager(createdVillagerDto: Villager): Promise<VillagerModel> {
    const createdVillager = await (await new this.villagerModel(createdVillagerDto)).save();
  
    await this.neo4jService.write(villagerCypher.addVillager, {
      id: createdVillager._id.toString(),
    });
    return createdVillager;
  }

  async updateVillager(updatedVillager: Villager, userId: string): Promise<VillagerModel> {
    if(updatedVillager.createdBy != userId) {
      throw new ForbiddenException('You are not authorized to update this villager');
    }
    const oldVillager = await this.villagerModel.findById(updatedVillager._id).exec();
    const villager = await this.villagerModel
      .findOneAndUpdate({ _id: updatedVillager._id }, updatedVillager, {
        new: true,
      })
      .exec();
    const user = await this.userModel.findById(updatedVillager.createdBy).exec();
    user.villagers = user.villagers.map((villager) =>
      villager._id == updatedVillager._id ? updatedVillager : villager
    );
    await user.save();
    return villager;
  }

  async deleteVillager(deletedVillager: Villager, userId: string) {
    // delete villager
    if(deletedVillager.createdBy != userId) {
      throw new ForbiddenException('You are not authorized to delete this villager');
    }
    const villager = await this.villagerModel
      .deleteOne({ _id: deletedVillager._id })
      .exec();

    const user = await this.userModel
      .findById(deletedVillager.createdBy)
      .exec();
    user.villagers = user.villagers.filter(
      (villager) => villager._id != deletedVillager._id
    );
    await user.save();

    const town = 

    await this.neo4jService.write(villagerCypher.removeVillager, {
      id: deletedVillager._id,
    });
    return villager;
  }

  async befriendVillager(username: string, id: string) {
    return await this.neo4jService.write(villagerCypher.befriendVillager, {
      id,
      username,
    });
  }

  async unfriendVillager(username: string, id: string) {
    return await this.neo4jService.write(villagerCypher.unfriendVillager, {
      id,
      username,
    });
  }

  async getBefriendedVillagers(username: string) {
    const result = await this.neo4jService.read(
      villagerCypher.getBefriendedVillagers,
      {
        username,
      }
    );
    return result.records.map((record) => record.get('b').properties);
  }

  async checkIfFriends(username: string, id: string) {
    const result = await this.neo4jService.read(villagerCypher.checkIfFriends, {
      id,
      username,
    });
    return result.records.length > 0;
  }

  async updateVillagerHearts(username: string, id: string) {
    const result = await this.neo4jService.read(
      villagerCypher.getVillagerHearts,
      {
        id,
        username,
      }
    );
    let numberOfHearts = result.records[0].get('befriends.numberOfHearts');
    if (numberOfHearts >= 10) {
      return;
    }
    numberOfHearts++;
    return await this.neo4jService.write(villagerCypher.updateVillagerHearts, {
      id,
      username,
      numberOfHearts,
    });
  }

  async getVillagerHearts(username: string, id: string) {
    const result = await this.neo4jService.read(villagerCypher.getVillagerHearts, {
      id,
      username,
    });
    if(result.records.length == 0) {
      return 0
    } 
    let numberOfHearts = result.records[0].get('befriends.numberOfHearts')
    console.log(numberOfHearts.toNumber())
    return numberOfHearts.toNumber();
  }
}
