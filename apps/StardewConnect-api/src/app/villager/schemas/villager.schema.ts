import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { Document } from "mongoose";

export type VillagerDocument = Villager & Document;

@Schema()
export class Villager {

    @IsMongoId()
    _id: string;

    @Prop()
    name: string;


    @Prop({type: String, enum: ["Male", "Female", "Other", "Unknown"], default: "Unknown"})
    gender;

    @Prop({type: String, enum:["Child","Adult","Elder","Unknown"], default: "Unknown"})
    lifeStage;

    @Prop()
    marriageable: boolean;

    @Prop()
    birthday: string;

    @Prop([String])
    favoriteGifts: string[];

    @Prop()
    createdBy: string;
}

export const VillagerSchema = SchemaFactory.createForClass(Villager);

VillagerSchema.post('save', async function (doc) {
    const user = this.$model('User');
    await user.updateOne({ _id: doc.createdBy }, { $push: { villagers: doc._id } });
  });
  