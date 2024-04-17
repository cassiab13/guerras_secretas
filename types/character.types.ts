import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { ObjectId } from "mongoose";

export interface Character {
  _id: ObjectId | null;
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: Image;
  comics: Comic[];
  stories: Storie[];
  events: Event[];
  series: Serie[];
}
