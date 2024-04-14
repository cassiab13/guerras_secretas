import { Document } from "mongoose";
import { Serie } from "./serie.types";

export interface SerieSummary extends Document {
    serie: Serie,
    name: string
}