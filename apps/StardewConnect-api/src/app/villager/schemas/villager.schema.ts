import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { HydratedDocument } from "mongoose";

export type TownDocument = HydratedDocument<Villager>;

@Schema()
export class Villager {
    @IsMongoId()
    id: string;

    @Prop()
    name: string;

    @Prop()
    gender: {type: string, enum:["Female","Male","Other","Unknown"], default: "Unknown"};

    @Prop()
    lifeStage: {type: string, enum:["Child","Adult","Elder","Unknown"], default: "Unknown"};

    @Prop()
    marriageable: boolean;

    @Prop()
    birthday: string;

    @Prop([String])
    favoriteGifts: string[];
}

export const VillagerSchema = SchemaFactory.createForClass(Villager);