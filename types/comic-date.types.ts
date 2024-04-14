import { Date, Document } from "mongoose";

export interface ComicDate extends Document {
    type: string,
    date: Date
}