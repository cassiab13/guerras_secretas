import { ObjectId } from "mongoose";

export interface ComicText {
    _id: ObjectId | null;
    type: string,
    language: string,
    text: string
}