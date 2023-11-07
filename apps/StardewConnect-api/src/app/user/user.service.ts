import { User } from '@StardewConnect/libs/data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users: User[] = [
      {
        id: 1,
        username: 'AbiLovesFood',
        name: 'Abigail',
        emailAddress: 'pierresdaughter@mail.com',
        password: 'Amethyst123',
        favoriteThing: 'Amethyst',
        memberSince: new Date('November 13, 2022'),
      },
      {
        id: 2,
        username: 'BashPrograms',
        name: 'Sebastian',
        emailAddress: 'EmoBoy@mail.com',
        password: 'INeverLeaveMyRoomLOL420',
        favoriteThing: 'Frozen Tear',
        memberSince: new Date('December 17, 2021'),
      },
      {
        id: 3,
        username: 'CottageCoreL',
        name: 'Leah',
        emailAddress: 'L.Artist@mail.com',
        password: 'ForageBaby234',
        favoriteThing: 'Poppyseed Muffin',
        memberSince: new Date('December 23, 2021'),
      },
      {
        id: 4,
        username: 'ThatOneDrunkGuy',
        name: 'Shane',
        emailAddress: 'HotPepperBoy@mail.com',
        password: 'JojaSucks245',
        favoriteThing: 'Beer',
        memberSince: new Date('May 20, 2022'),
      },
    ];
  
    private getIndexById(user: User): number {
      return this.users.findIndex((u) => u.id === user.id);
    }
  
    getAll() {
      return { results: this.users };
    }
  
    getUserByUsername(username: string) {
      return {
        results: this.users.filter((user) => user.username === username)[0],
      };
    }
  
    addUser(newUser: User) {
      newUser.id = this.users.at(this.users.length - 1)!.id + 1;
      console.log(newUser.id);
      this.users.push(newUser);
    }
  
    updateUser(updatedUser: User) {
      const index = this.getIndexById(updatedUser);
        
    }
  
    deleteUser(deletedUser: User) {
      const index = this.getIndexById(deletedUser);
      this.users.splice(index, 1);
      console.log(this.users);
    }
  }
