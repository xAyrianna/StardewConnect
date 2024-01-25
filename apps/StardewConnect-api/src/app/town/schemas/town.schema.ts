import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventSchema } from '../../event/schemas/event.schema';
import { Event } from '@StardewConnect/libs/data';

export type TownDocument = Town & Document;

@Schema({validateBeforeSave: false}) //TODO: validateBeforeSave: true
export class Town {
  @IsMongoId()
  id: string;

  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop([String])
  facilities: string[];

  @Prop()
  creationDate: Date;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: string;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Villager' }],
  })
  villagersInTown: string[];

  @Prop({required: false, default: [], type: EventSchema })
  events: Event[];
}

export const TownSchema = SchemaFactory.createForClass(Town);
