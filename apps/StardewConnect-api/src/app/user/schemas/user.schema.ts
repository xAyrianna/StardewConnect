import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId } from "class-validator";
import { HydratedDocument } from "mongoose";

export type TownDocument = HydratedDocument<User>;

@Schema()
export class User {
    @IsMongoId()
    id: string;

    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    birthday: Date;

    @Prop()
    favoriteThing: string;

    @Prop()
    registrationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);