import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@StardewConnect/libs/data';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of users' })
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User by id' })
  getUserByUsername(@Param('id') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'User by id' })
  getUserById(@Param('id') id: string) {
    console.log("Get by id method called")
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  addUser(@Body() user: User) {
    console.log("Create method called")
    return this.userService.addUser(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  updateUser(@Body() updatedUser: User, @InjectToken() token : Token){
    return this.userService.updateUser(updatedUser, token.sub);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  deleteUser(@Body() deletedUser: User, @InjectToken() token : Token){
    return this.userService.deleteUser(deletedUser, token.sub);
  }

  @Post('follow/:toFollow')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'User followed successfully' })
  followUser(@Param('toFollow') toFollow: string, @InjectToken() token : Token) {
    console.log("Follow method called")
    return this.userService.followUser(token.username,toFollow);
  }

  @Delete('unfollow/:toUnfollow')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'User unfollowed successfully' })
  unfollowUser(@Param('toUnfollow') toUnfollow: string, @InjectToken() token : Token) {
    return this.userService.unfollowUser(token.username,toUnfollow);
  }

  @Get('followers')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of followers' })
  getFollowers(@InjectToken() token : Token) {
    return this.userService.getFollowers(token.username);
  }

  @Get('check/:toFollow')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Check if friends' })
  checkIfFollowing(@Param('toFollow') toFollow: string, @InjectToken() token : Token) {
    return this.userService.checkIfFollowing(token.username, toFollow);
  }

  @Get('following')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of following' })
  getFollowing(@InjectToken() token : Token) {
    return this.userService.getFollowing(token.username);
  }

  @Get('recommendations/following')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of recommendations' })
  getRecommendations(@InjectToken() token : Token) {
    return this.userService.getRecommendations(token.username);
  }

  @Get('recommendations/friends')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of recommendations' })
  getFriendRecommendations(@InjectToken() token : Token,) {
    return this.userService.getUserFromBefriended(token.username);
  }
}
