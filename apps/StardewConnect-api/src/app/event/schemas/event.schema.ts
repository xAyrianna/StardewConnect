import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {

    @IsMongoId()
    id: string;

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    date: string;
    
    @Prop()
    location: string;

    @Prop()
    hasHappened: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);