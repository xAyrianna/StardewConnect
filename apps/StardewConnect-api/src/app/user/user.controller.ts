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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of users' })
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User by id' })
  getUserByUsername(@Param('id') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  addUser(@Body() user: User) {
    console.log("Create method called")
    return this.userService.addUser(user);
  }

  @Put()
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  updateUser(@Body() updatedUser: User) {
    this.userService.updateUser(updatedUser);
  }

  @Delete()
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  deleteUser(@Body() deletedUser: User) {
    this.userService.deleteUser(deletedUser);
  }
}
