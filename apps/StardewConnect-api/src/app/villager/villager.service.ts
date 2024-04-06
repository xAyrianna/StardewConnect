import { Injectable } from '@nestjs/common';
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

@Injectable()
export class VillagerService {
  constructor(
    @InjectModel(VillagerModel.name)
    private villagerModel: Model<VillagerDocument>,
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<{ results: Villager[] }> {
    const villagers = await this.villagerModel.find().exec();
    console.log('Database returns: ', villagers);
    return { results: villagers };
  }

  async getVillagerByName(name: string): Promise<{ results: Villager }> {
    const villager = await this.villagerModel.findOne({ name }).exec();
    return { results: villager };
  }

  async addVillager(createdVillagerDto: Villager): Promise<VillagerModel> {
    const createdVillager = await new this.villagerModel(createdVillagerDto);
    await this.neo4jService.write(villagerCypher.addVillager, {
      id: createdVillagerDto._id,
    });
    return createdVillager.save();
  }

  async updateVillager(updatedVillager: Villager): Promise<VillagerModel> {
    const villager = await this.villagerModel
      .findOneAndUpdate({ _id: updatedVillager._id }, updatedVillager, {
        new: true,
      })
      .exec();
    return villager;
  }

  async deleteVillager(deletedVillager: Villager) {
    // delete villager
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
}
