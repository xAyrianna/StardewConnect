import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TownService } from './town.service';
import { Town } from '@StardewConnect/libs/data';
import { ApiTags } from '@nestjs/swagger';

@Controller('town')
@ApiTags('Town')
export class TownController {
    constructor(private readonly townService: TownService){}

    @Get()
    getAll(){
      return this.townService.getAll();
    }
  
    @Get(':id')
    getTownByUsername(@Param('id') name: string) {
      return this.townService.getTownByName(name);
    }
    @Post()
    addTown(@Body() town: Town) {
      this.townService.addTown(town);
    }
  
    @Put()
    updateTown(@Body() updatedTown: Town) {
      this.townService.updateTown(updatedTown);
    }
  
    @Delete()
    deleteTown(@Body() deletedTown: Town) {
      this.townService.deleteTown(deletedTown);
    }
}

