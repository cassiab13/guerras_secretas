import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Storie } from "./storie.types";
import { Comic } from "./comic.types";
import { Event } from "./event.types";
import { ObjectId } from "mongoose";

export interface Creator {
  _id: ObjectId | null;
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  role: string;
  modified: Date;
  resourceURI: string;
  thumbnail: Image;
  series: Serie[];
  stories: Storie[];
  comics: Comic[];
  events: Event[];
}
