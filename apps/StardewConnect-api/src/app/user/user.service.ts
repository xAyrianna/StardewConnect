import { Injectable } from '@nestjs/common';
import { User } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  // users: User[] = [
  //   {
  //     id: 1,
  //     username: 'AbiLovesFood',
  //     name: 'Abigail',
  //     emailAddress: 'pierresdaughter@mail.com',
  //     password: 'Amethyst123',
  //     birthday: new Date('November 13, 2002'),
  //     favoriteThing: 'Amethyst',
  //     memberSince: new Date('November 13, 2022'),
  //   },
  //   {
  //     id: 2,
  //     username: 'BashPrograms',
  //     name: 'Sebastian',
  //     emailAddress: 'EmoBoy@mail.com',
  //     password: 'INeverLeaveMyRoomLOL420',
  //     birthday: new Date('January 10, 1999'),
  //     favoriteThing: 'Frozen Tear',
  //     memberSince: new Date('December 17, 2021'),
  //   },
  //   {
  //     id: 3,
  //     username: 'CottageCoreL',
  //     name: 'Leah',
  //     emailAddress: 'L.Artist@mail.com',
  //     password: 'ForageBaby234',
  //     birthday: new Date('December 23, 1995'),
  //     favoriteThing: 'Poppyseed Muffin',
  //     memberSince: new Date('December 23, 2021'),
  //   },
  //   {
  //     id: 4,
  //     username: 'ThatOneDrunkGuy',
  //     name: 'Shane',
  //     emailAddress: 'HotPepperBoy@mail.com',
  //     password: 'JojaSucks245',
  //     birthday: new Date('March 20, 2001'),
  //     favoriteThing: 'Beer',
  //     memberSince: new Date('May 20, 2022'),
  //   },
  // ];
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<{ results: User[] }> {
    const users = await this.userModel.find().exec();
    console.log('Database returns: ', users);
    return { results: users };
  }

  async getUserByUsername(username: string): Promise<{ results: User }> {
    const user = await this.userModel.findOne({ username }).exec();
    return { results: user };
  }

  async addUser(createdUserDto: User): Promise<UserModel> {
    console.log('Creating ' + createdUserDto + ' in the database');
    createdUserDto.password = await bcrypt.hash(createdUserDto.password, 10);
    const createdUser = await new this.userModel(createdUserDto);
    return createdUser.save();
    // newUser.id = this.users.at(this.users.length - 1)!.id + 1;
    // console.log(newUser.id);
    // this.users.push(newUser);
  }

  async updateUser(updatedUser: User): Promise<User> {
    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    const user = await this.userModel
      .findOneAndUpdate({ id: updatedUser.id }, updatedUser, { new: true })
      .exec();
    console.log('Updating ' + user);
    return user;
  }

  async deleteUser(deletedUser: User) {
    return await this.userModel.findOneAndDelete({ id: deletedUser.id }).exec();
  }
}
