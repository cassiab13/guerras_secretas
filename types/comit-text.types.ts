import { ObjectId } from "mongoose";

export interface ComicText {
    type: string,
    language: string,
    text: string
}