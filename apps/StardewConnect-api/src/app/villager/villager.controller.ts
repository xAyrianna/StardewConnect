import { Villager } from '@StardewConnect/libs/data';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('villager')
@ApiTags('Villager')
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
    updateVillager(@Body() updatedUser: Villager) {
      this.villagerService.updateVillager(updatedUser);
    }
  
    @Delete()
    @ApiResponse({ status: 204, description: 'Villager deleted successfully' })
    deleteVillager(@Body() deletedUser: Villager) {
      this.villagerService.deleteVillager(deletedUser);
    }
  }
