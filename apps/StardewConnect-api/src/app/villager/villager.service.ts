import { Gender, LifeStage, Villager } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';

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
  
    private getIndexById(villager: Villager): number {
      return this.villagers.findIndex((v) => v.id === villager.id);
    }
  
    getAll() {
      return { results: this.villagers };
    }
  
    getVillagerByName(name: string) {
      return {
        results: this.villagers.filter((villager) => villager.name === name)[0],
      };
    }
  
    addVillager(newVillager: Villager) {
      newVillager.id = this.villagers.at(this.villagers.length - 1)!.id + 1;
      console.log(newVillager.id);
      this.villagers.push(newVillager);
    }
  
    updateVillager(updatedVillager: Villager) {
      const index = this.getIndexById(updatedVillager);
      this.villagers[index] = updatedVillager;
    }
  
    deleteVillager(deletedVillager: Villager) {
      // delete villager
      const index = this.getIndexById(deletedVillager);
      this.villagers.splice(index, 1);
      console.log(this.villagers);
    }
  }
