import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@StardewConnect/libs/data';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserByUsername(@Param('id') username: string) {
    return this.userService.getUserByUsername(username);
  }
  @Post()
  addUser(@Body() user: User) {
    this.userService.addUser(user);
  }

  @Put()
  updateUser(@Body() updatedUser: User) {
    this.userService.updateUser(updatedUser);
  }

  @Delete()
  deleteUser(@Body() deletedUser: User) {
    this.userService.deleteUser(deletedUser);
  }
}
