import { Document } from "mongoose";

export interface ComicPrice extends Document {
    type: string,
    price: number
}