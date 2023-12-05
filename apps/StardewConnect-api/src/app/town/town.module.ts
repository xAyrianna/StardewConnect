import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TownSchema } from './schemas/town.schema';
import { TownController } from './town.controller';
import { TownService } from './town.service';

@Module({
    imports: [MongooseModule.forFeature([{name: "Town", schema: TownSchema}])],
    controllers: [TownController],
    providers: [TownService], 
    exports: [TownService], 
})
export class TownModule {}
