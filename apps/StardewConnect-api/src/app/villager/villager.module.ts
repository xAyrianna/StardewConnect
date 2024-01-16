import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from './schemas/villager.schema';
import { VillagerController } from './villager.controller';
import { VillagerService } from './villager.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Villager.name, schema: VillagerSchema}])],
    controllers: [VillagerController],
    providers: [VillagerService],
    exports: [VillagerService],
})
export class VillagerModule {}
