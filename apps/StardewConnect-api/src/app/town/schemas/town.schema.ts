import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { HydratedDocument } from "mongoose";

export type TownDocument = HydratedDocument<Town>;

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