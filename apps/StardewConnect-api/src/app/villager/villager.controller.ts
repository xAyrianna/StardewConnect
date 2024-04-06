import { Villager } from '@StardewConnect/libs/data';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('villager')
@ApiTags('Villager')
@UseGuards(AuthGuard)
export class VillagerController {
    constructor(private readonly villagerService: VillagerService) {}
  
    @Get()
    @ApiResponse({ status: 200, description: 'List of villagers' })
    getAll() {
      return this.villagerService.getAll();
    }
  
    @Get(':id')
    @ApiResponse({ status: 200, description: 'Villager by id' })
    getVillagerByName(@Param('id') name: string) {
      return this.villagerService.getVillagerByName(name);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Villager created successfully' })
    addVillager(@Body() user: Villager) {
      this.villagerService.addVillager(user);
    }
  
    @Put()
    @ApiResponse({ status: 200, description: 'Villager updated successfully' })
    updateVillager(@Body() updatedUser: Villager, @InjectToken() token : Token){
      this.villagerService.updateVillager(updatedUser, token.sub);
    }
  
    @Delete()
    @ApiResponse({ status: 204, description: 'Villager deleted successfully' })
    deleteVillager(@Body() deletedUser: Villager, @InjectToken() token : Token){
      this.villagerService.deleteVillager(deletedUser, token.sub);
    }

    @Post(':id')
    @ApiResponse({ status: 201, description: 'Villager befriended' })
    befriendVillager(@Param('id') id: string, @InjectToken() token : Token) {
      this.villagerService.befriendVillager(token.username, id);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: 'Villager unfriended' })
    unfriendVillager(@Param('id') id: string, @InjectToken() token : Token) {
      this.villagerService.unfriendVillager(token.username, id);
    }

    @Get('friends')
    @ApiResponse({ status: 200, description: 'List of friends' })
    getFriends(@InjectToken() token : Token) {
      return this.villagerService.getBefriendedVillagers(token.username);
    }
  }
