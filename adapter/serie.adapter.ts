import { Serie } from './../types/serie.types';
import { SerieExternal } from "../dto/external/serie-external.dto";
import { Adapter } from "./adapter";
import { ImageService } from '../service/external/image.service';

export class SerieAdapter implements Adapter<SerieExternal, Serie> {

    private imageService: ImageService = new ImageService();

    public async toInternal(external: SerieExternal): Promise<Serie> {
        
        const image = await this.imageService.save(external.thumbnail);

        return {
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