import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { EventSchema } from '../../event/schemas/event.schema';
import { Event } from '@StardewConnect/libs/data';
import { Villager } from '../../../../../../libs/data/src';

export type TownDocument = Town & Document;

@Schema()
export class Town {
  @IsMongoId()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop([String])
  facilities: string[];

  @Prop()
  creationDate: Date;

  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: string;

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Villager' }],
  })
  villagersInTown: Villager[];

  @Prop({
    default: [],
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Event' }],
  })
  events: Event[];
}

export const TownSchema = SchemaFactory.createForClass(Town);

TownSchema.post('save', async function (doc) {
  const user = this.$model('User');
  await user.updateOne({ _id: doc.createdBy }, { $push: { towns: doc._id } });
});

