import { Document } from "mongoose";
import { Serie } from "./serie.types";

export interface SerieSummary {
    serie: Serie,
    name: string
}