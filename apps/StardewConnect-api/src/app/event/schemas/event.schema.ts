import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @IsMongoId()
  _id: string;

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

EventSchema.post('save', async function (doc) {
  console.log('Event saved', doc);
  const Town = this.$model('Town');
  await Town.updateOne({ _id: doc.inTownId }, { $push: { events: doc._id } });
});

