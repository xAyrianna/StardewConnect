import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Town } from "@StardewConnect/libs/data";

export type UserDocument = User & Document;

@Schema()
export class User {
    @IsMongoId()
    _id: string;

    @Prop({required: true, unique: true})
    username: string;

    @Prop()
    name: string;

    @Prop({required: true, unique: true})
    emailAddress: string;

    @Prop()
    password: string;

    @Prop()
    birthday: Date;

    @Prop()
    favoriteThing: string;

    @Prop()
    memberSince: Date;

    @Prop({
        default: [],
        type: [MongooseSchema.Types.ObjectId],
        ref: 'Town',
    })
    towns?: Town[];

}

export const UserSchema = SchemaFactory.createForClass(User);