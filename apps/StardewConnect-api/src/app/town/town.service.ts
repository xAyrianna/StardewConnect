import { Town } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';

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
  
    private getIndexById(town: Town): number {
      return this.towns.findIndex((t) => t.id === town.id);
    }
  
    getAll() {
      return { results: this.towns };
    }
  
    getTownByName(name: string) {
      return {
        results: this.towns.filter((town) => town.name === name)[0],
      };
    }
  
    addTown(newTown: Town) {
      newTown.id = this.towns.at(this.towns.length - 1)!.id + 1;
      console.log(newTown.id);
      this.towns.push(newTown);
    }
  
    updateTown(updatedTown: Town) {
      const index = this.getIndexById(updatedTown);
      this.towns[index] = updatedTown;
    }
  
    deleteTown(deletedTown: Town) {
      const index = this.getIndexById(deletedTown);
      this.towns.splice(index, 1);
      console.log(this.towns);
    }
  }
  
