import { ObjectId } from "mongoose";
import { Serie } from "./serie.types";

export interface SerieSummary {
  serie: Serie | null;
  name: string;
}
