import { Serie } from './../types/serie.types';
import { SerieExternal } from "../dto/external/serie-external.dto";
import { Adapter } from "./adapter";
import { ImageRepository } from '../repository/image.repository';

export class SerieAdapter implements Adapter<SerieExternal, Serie> {

    private imageRepository: ImageRepository = new ImageRepository();

    public async toInternal(external: SerieExternal): Promise<Serie> {
        
        const image = await this.imageRepository.create(external.thumbnail);

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
          comics: [],
          stories: [],
          events: [],
          characters: [],
          creators: [],
          next: null,
          previous: null,
        };
    }

}