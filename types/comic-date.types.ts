import { ObjectId } from "mongoose";

export interface ComicDate {
  _id: ObjectId | null;
  type: string;
  date: Date;
}
