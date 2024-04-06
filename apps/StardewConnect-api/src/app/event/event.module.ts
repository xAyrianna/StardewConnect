import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Town, TownSchema } from '../town/schemas/town.schema';
import { TownService } from '../town/town.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Town.name, schema: TownSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, TownService, UserService],
  exports: [EventService],
})
export class EventModule {}
