import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FilmDocument = Film & Document;

@Schema()
export class Film {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    rating: number

    @Prop()
    poster: string

    @Prop()
    year: string
}

export const FilmSchema = SchemaFactory.createForClass(Film)