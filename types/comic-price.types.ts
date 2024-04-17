import { ObjectId } from "mongoose";

export interface ComicPrice {
    _id: ObjectId | null;
    type: string,
    price: number
}