import { Villager } from '@StardewConnect/libs/data';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VillagerService } from './villager.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('villager')
@ApiTags('Villager')
export class VillagerController {
    constructor(private readonly villagerService: VillagerService) {}
  
    @Get()
    getAll() {
      return this.villagerService.getAll();
    }
  
    @Get(':id')
    getVillagerByName(@Param('id') name: string) {
      return this.villagerService.getVillagerByName(name);
    }
    @Post()
    addVillager(@Body() user: Villager) {
      this.villagerService.addVillager(user);
    }
  
    @Put()
    updateVillager(@Body() updatedUser: Villager) {
      this.villagerService.updateVillager(updatedUser);
    }
  
    @Delete()
    deleteVillager(@Body() deletedUser: Villager) {
      this.villagerService.deleteVillager(deletedUser);
    }
  }
