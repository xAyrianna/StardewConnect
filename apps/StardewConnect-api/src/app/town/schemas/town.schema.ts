import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { Document } from "mongoose";

export type TownDocument = Town & Document

@Schema()
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
}

export const TownSchema = SchemaFactory.createForClass(Town);