import { ObjectId } from "mongoose";

export interface Image {
    _id: ObjectId | null;
    path: string,
    extension: string
}