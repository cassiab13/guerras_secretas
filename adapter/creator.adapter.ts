import { CreatorExternal } from "dto/external/creator-external.dto";
import { Adapter } from "./adapter";
import { Creator } from "types/creator.types";
import { ImageAdapter } from "./image.adapter";

export class CreatorAdapter implements Adapter<CreatorExternal, Creator> {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);

    return {
      _id: null,
      id: external.id,
      firstName: external.firstName,
      middleName: external.middleName,
      lastName: external.lastName,
      suffix: external.suffix,
      fullName: external.fullName,
      role: external.role,
      modified: new Date(external.modified),
      resourceURI: external.resourceURI,
      thumbnail: image,
      series: external.series,
      stories: external.stories,
      comics: external.comics,
      events: external.events,
    };
  }
}
