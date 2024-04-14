import { Document } from "mongoose";

export interface Image extends Document {
    path: string,
    extension: string
}