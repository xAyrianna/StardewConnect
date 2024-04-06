import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Town, TownSchema } from './schemas/town.schema';
import { TownController } from './town.controller';
import { TownService } from './town.service';
import { EventService } from '../event/event.service';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Town.name, schema: TownSchema },
      { name: Event.name, schema: EventSchema },
      { name: User.name, schema: UserSchema}
    ]),
  ],
  controllers: [TownController],
  providers: [TownService, EventService, UserService],
  exports: [TownService],
})
export class TownModule {}
