import { Injectable } from '@nestjs/common';
import { Gender, LifeStage, Villager } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Villager as VillagerModel, VillagerDocument } from './schemas/villager.schema';
@Injectable()
export class VillagerService {
    villagers: Villager[] = [
      {
        id: 1,
        name: 'Evelyn',
        gender: Gender.Female,
        lifeStage: LifeStage.Elder,
        marriageable: false,
        birthday: 'Winter 20',
        favoriteGifts: [
          'Beet',
          'Chocolate Cake',
          'Diamond',
          'Fairy Rose',
          'Stuffing',
          'Tulip',
        ],
      },
      {
        id: 2,
        name: 'Sophia',
        gender: Gender.Female,
        lifeStage: LifeStage.Adult,
        marriageable: true,
        birthday: 'Winter 27',
        favoriteGifts: [
          'Fairy Stone',
          'Grampleton Orange Chicken',
          'Fairy Rose',
          'Puppyfish',
        ],
      },
      {
        id: 3,
        name: 'Morgan',
        gender: Gender.Other,
        lifeStage: LifeStage.Child,
        marriageable: false,
        birthday: 'Fall 7',
        favoriteGifts: ['Iridium Bar', 'Void Egg', 'Void Mayonnaise'],
      },
      {
        id: 4,
        name: 'Victor',
        gender: Gender.Male,
        lifeStage: LifeStage.Adult,
        marriageable: true,
        birthday: 'Summer 23',
        favoriteGifts: [
          'Aged Blue Moon Wine',
          'Spaghetti',
          'Battery Pack',
          'Duck Feather',
          'Lunarite',
        ],
      },
    ];
    constructor(
      @InjectModel(VillagerModel.name) private villagerModel: Model<VillagerDocument>
    ) {}
  
    async getAll(): Promise <{ results: Villager[]}> {
      const villagers = await this.villagerModel.find().exec();
      console.log("Database returns: ", villagers);
      return { results: villagers};
    }
  
    async getVillagerByName(name: string): Promise<{ results: Villager}> {
    const villager = await this.villagerModel.findOne({ name }).exec();
    return { results: villager }; 
    }
  
    async addVillager(createdVillagerDto: Villager): Promise<VillagerModel> {
      const createdVillager = await new this.villagerModel(createdVillagerDto);
      return createdVillager.save();
    }
  
    async updateVillager(updatedVillager: Villager): Promise<VillagerModel> {
      const villager = await this.villagerModel.findOne({ id: updatedVillager.id }).exec();
      console.log("Updating " + villager);
      return villager;
    }
  
    async deleteVillager(deletedVillager: Villager) {
      // delete villager
      return await this.villagerModel.deleteOne({ id: deletedVillager.id }).exec();
    }
  }
