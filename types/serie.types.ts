import { Image } from "./image.types";
import { Comic } from "./comic.types";
import { Storie } from "./storie.types";
import { Character } from "./character.types";
import { Creator } from "./creator.types";
import { SerieSummary } from "./serie-summary.types";
import { Event } from "./event.types";
import { ObjectId } from "mongoose";
import { CollectionURI } from "dto/external/collection-uri.dto";

export interface Serie {
  _id: ObjectId | null;
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: Image;
  comics: CollectionURI | Comic[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
  characters: CollectionURI | Character[];
  creators: CollectionURI | Creator[];
  next: any | null;
  previous: any | null;
}
