import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @IsMongoId()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  date: string;

  @Prop()
  location: string;

  @Prop()
  hasHappened: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Town' })
  inTownId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
