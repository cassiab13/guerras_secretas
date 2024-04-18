import { StorieExternal } from "dto/external/storie-external.dto";
import { Adapter } from "./adapter";
import { Storie } from "types/storie.types";
import { ImageService } from "../service/external/image.service";

export class StorieAdapter implements Adapter<StorieExternal, Storie> {

  private imageService: ImageService = new ImageService();

  public async toInternal(external: StorieExternal): Promise<Storie> {
  
    const image = await this.imageService.save(external.thumbnail);
    
    return {
      id: external.id,
      title: external.title,
      description: external.description,
      resourceURI: external.resourceURI,
      type: external.type,
      modified: new Date(external.modified),
      thumbnail: image,
      comics: external.comics,
      series: external.series,
      events: external.events,
      characters: external.characters,
      creators: external.creators,
    };
  }

  public async toInternalSave(external: StorieExternal): Promise<Storie> {
    
    const image = await this.imageService.save(external.thumbnail);
    
    return {
      id: external.id,
      title: external.title,
      description: external.description,
      resourceURI: external.resourceURI,
      type: external.type,
      modified: new Date(external.modified),
      thumbnail: image,
      comics: [],
      series: [],
      events: [],
      characters: [],
      creators: [],
    };
  }
}
