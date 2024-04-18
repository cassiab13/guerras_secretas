import { ImageAdapter } from "./image.adapter";
import { StorieExternal } from "dto/external/storie-external.dto";
import { Adapter } from "./adapter";
import { Storie } from "types/storie.types";

export class StorieAdapter implements Adapter<StorieExternal, Storie> {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: StorieExternal): Promise<Storie> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);
    
    return {
      _id: null,
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
}
