import { CollectionURI } from 'dto/external/collection-uri.dto';
import { Image } from "./image.types";
import { Serie } from "./serie.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { ObjectId } from "mongoose";
import { Event } from './event.types';

export interface Character {
  _id: ObjectId | null;
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: Image;
  comics: CollectionURI | Comic[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
  series: CollectionURI | Serie[];
}
