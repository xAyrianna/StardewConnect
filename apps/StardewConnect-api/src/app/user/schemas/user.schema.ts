import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @IsMongoId()
    id: string;

    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    emailAddress: string;

    @Prop()
    password: string;

    @Prop()
    birthday: Date;

    @Prop()
    favoriteThing: string;

    @Prop()
    memberSince: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);