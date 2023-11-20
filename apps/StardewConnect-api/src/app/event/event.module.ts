import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';


@Module({
    imports: [MongooseModule.forFeature([{name: "Event", schema: EventSchema}])],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
