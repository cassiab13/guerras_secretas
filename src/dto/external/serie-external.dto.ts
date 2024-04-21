import { Comic } from "src/types/comic.types";
import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";
import { Storie } from "src/types/storie.types";
import { Event } from "src/types/event.types";
import { Character } from "src/types/character.types";
import { Creator } from "src/types/creator.types";

export interface SerieExternal {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: ImageExternal;
  comics: CollectionURI | Comic[];
  stories: CollectionURI | Storie[];
  events: CollectionURI | Event[];
  characters: CollectionURI | Character[];
  creators: CollectionURI | Creator[];
}