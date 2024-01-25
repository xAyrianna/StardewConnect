import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TownService } from './town.service';
import { Town } from '@StardewConnect/libs/data';
import {ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('town')
@ApiTags('Town')
export class TownController {
  constructor(private readonly townService: TownService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of towns' })
  getAll() {
    return this.townService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Town by name' })
  getTownByName(@Param('id') name: string) {
    return this.townService.getTownByName(name);
  }

  @Get('id/:id')
  @ApiResponse({ status: 200, description: 'Town by id' })
  getTownById(@Param('id') id: string) {
    return this.townService.getTownById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Town created successfully' })
  addTown(@Body() town: Town) {
    this.townService.addTown(town);
  }

  @Put()
  @ApiResponse({ status: 200, description: 'Town updated successfully' })
  updateTown(@Body() updatedTown: Town) {
    this.townService.updateTown(updatedTown);
  }

  @Delete()
  @ApiResponse({ status: 204, description: 'Town deleted successfully' })
  deleteTown(@Body() deletedTown: Town) {
    this.townService.deleteTown(deletedTown);
  }
}
