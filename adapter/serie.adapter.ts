import { Comic } from 'types/comic.types';
import { ImageAdapter } from './image.adapter';
import { Serie } from './../types/serie.types';
import { SerieExternal } from "../dto/external/serie-external.dto";
import { Adapter } from "./adapter";

export class SerieAdapter implements Adapter<SerieExternal, Serie> {

    private imageAdapter: ImageAdapter = new ImageAdapter();

    public async toInternal(external: SerieExternal): Promise<Serie> {
        
        const image = await this.imageAdapter.toInternal(external.thumbnail);

        return {
          _id: null,
          id: external.id,
          title: external.title,
          description: external.description,
          resourceURI: external.resourceURI,
          startYear: external.startYear,
          endYear: external.endYear,
          rating: external.rating,
          modified: new Date(external.modified),
          thumbnail: image,
          comics: external.comics,
          stories: external.stories,
          events: external.events,
          characters: external.characters,
          creators: external.creators,
          next: null,
          previous: null,
        };
    }

}