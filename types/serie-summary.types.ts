import { ObjectId } from "mongoose";
import { Serie } from "./serie.types";

export interface SerieSummary {
  _id: ObjectId | null;
  serie: Serie | null;
  name: string;
}
