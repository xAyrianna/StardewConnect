import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Villager, VillagerSchema } from './schemas/villager.schema';
import { VillagerController } from './villager.controller';
import { VillagerService } from './villager.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { Town, TownSchema } from '../town/schemas/town.schema';
import { TownService } from '../town/town.service';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { EventService } from '../event/event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Villager.name, schema: VillagerSchema },
      { name: User.name, schema: UserSchema },
      { name: Town.name, schema: TownSchema },
      { name: Event.name, schema: EventSchema}
    ]),
  ],
  controllers: [VillagerController],
  providers: [VillagerService, UserService, TownService, EventService],
  exports: [VillagerService],
})
export class VillagerModule {}
