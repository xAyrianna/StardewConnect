import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { User } from '@StardewConnect/libs/data';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Neo4jService } from '../neo4j/neo4j.service';
import { userCypher } from './neo4j/user.cypher';
import { VillagerService } from '../villager/villager.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly neo4jService: Neo4jService
  ) {}

  async getAll(): Promise<{ results: User[] }> {
    const users = await this.userModel
      .find()
      .populate('towns')
      .populate('villagers')
      .exec();
    return { results: users };
  }

  async getUserByUsername(username: string): Promise<{ results: User }> {
    const user = await this.userModel
      .findOne({ username })
      .populate({
        path: 'towns',
        populate: { path: 'villagersInTown' },
      })
      .populate('villagers')
      .exec();
    return { results: user };
  }

  async getUserById(id: string): Promise<{ results: User }> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'towns',
        populate: { path: 'villagersInTown' },
      })
      .populate('villagers')
      .exec();
    return { results: user };
  }

  async addUser(createdUserDto: User): Promise<UserModel> {
    try {
      createdUserDto.password = await bcrypt.hash(createdUserDto.password, 10);

      const createdUser = await (
        await new this.userModel(createdUserDto)
      ).save();
      await this.neo4jService.write(userCypher.addUser, {
        username: createdUserDto.username,
      });
      return createdUser;
    } catch (error) {
      console.log('Error creating user: ', error);
      if (error.code === 11000) {
        if (error.keyPattern.username) {
          throw new HttpException('Username is already taken', 400);
        } else if (error.keyPattern.emailAddress) {
          throw new HttpException('Email is already taken', 400);
        }
      }
      throw new HttpException('Error creating user', 500);
    }
  }

  async updateUser(updatedUser: User, userId: string): Promise<User> {
    console.log('Updating ' + updatedUser);
    if (updatedUser._id != userId) {
      throw new ForbiddenException(
        'You are not authorized to update this user'
      );
    }
    const oldUser = await this.userModel.findById(updatedUser._id).exec();
    delete updatedUser.password;
    const user = await this.userModel
      .findOneAndUpdate({ _id: updatedUser._id }, updatedUser, { new: true })
      .exec();
    if (oldUser.username != updatedUser.username) {
      await this.neo4jService.write(userCypher.updateUsername, {
        username: updatedUser.username,
        newUsername: updatedUser.username,
      });
    }
    return user;
  }

  async deleteUser(deletedUser: User, userId: string) {
    if (deletedUser._id != userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this user'
      );
    }
    const user = await this.userModel
      .findOneAndDelete({ _id: deletedUser._id })
      .exec();
    await this.neo4jService.write(userCypher.removeUser, {
      username: deletedUser.username,
    });
    return user;
  }

  async followUser(username: string, toFollow: string) {
    return await this.neo4jService.write(userCypher.followUser, {
      username,
      toFollow,
    });
  }

  async unfollowUser(username: string, toUnfollow: string) {
    return await this.neo4jService.write(userCypher.unfollowUser, {
      username,
      toUnfollow,
    });
  }

  async getFollowers(username: string) {
    const result = await this.neo4jService.read(userCypher.getFollowers, {
      username,
    });
    let followers = result.records.map(
      (record) => record.get('follower').properties
    );
    return followers;
  }

  async getFollowing(username: string) {
    const result = await this.neo4jService.read(userCypher.getFollowing, {
      username,
    });
    let following = result.records.map(
      (record) => record.get('following').properties
    );
    return following;
  }

  async checkIfFollowing(username: string, toFollow: string) {
    const result = await this.neo4jService.read(userCypher.checkIfFollowing, {
      username,
      toFollow,
    });
    return result.records.length > 0;
  }

  async getRecommendations(username: string) {
    let resultUsers: User[] = [];
    const result = await this.neo4jService.read(userCypher.getRecommendations, {
      username,
    });
    let recommendations = result.records.map(
      (record) => record.get('c').properties
    );
    for (let user of recommendations) {
      const userToAdd = (await this.getUserByUsername(user.username)).results;

      const isUserInArray = resultUsers.some(
        (resultUser) => resultUser.username === userToAdd.username
      );

      if (!isUserInArray) {
        resultUsers.push(userToAdd);
      }
    }
    return { results: resultUsers };
  }

  async getUserFromBefriended(username: string) {
    let resultUsers: User[] = [];
    const result = await this.neo4jService.read(
      userCypher.getUserFromBefriended,
      {
        username,
      }
    );
    let users = result.records.map((record) => record.get('b').properties);
    for (let user of users) {
      const userToAdd = (await this.getUserByUsername(user.username)).results;

      const isUserInArray = resultUsers.some(
        (resultUser) => resultUser.username === userToAdd.username
      );

      if (!isUserInArray) {
        resultUsers.push(userToAdd);
      }
    }
    return { results: resultUsers };
  }
}
