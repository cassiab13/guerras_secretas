import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { Comic } from './comic.types';
import { Event } from './event.types';
import { ObjectId } from "mongoose";

export interface Storie {
  _id: ObjectId | null;
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Image;
  comics: Comic[];
  series: Serie[];
  events: Event[];
  characters: Character[];
  creators: Creator[];
}