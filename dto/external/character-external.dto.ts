import { CollectionURI } from "./collection-uri.dto";
import { ImageExternal } from "./image-external.dto";

export interface CharacterExternal {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: ImageExternal;
  comics: CollectionURI;
  stories: CollectionURI;
  events: CollectionURI;
  series: CollectionURI;
}