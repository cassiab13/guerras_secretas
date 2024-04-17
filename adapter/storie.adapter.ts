import { ImageAdapter } from "./image.adapter";
import { StorieExternal } from "dto/external/storie-external.dto";
import { Adapter } from "./adapter";
import { Storie } from "types/storie.types";

export class StorieAdapter implements Adapter<StorieExternal, Storie> {
  private ImageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: StorieExternal): Promise<Storie> {
    const image = await this.ImageAdapter.toInternal(external.thumbnail);
    return {
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
