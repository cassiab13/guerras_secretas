import { CreatorExternal } from "dto/external/creator-external.dto";
import { Adapter } from "./adapter";
import { Creator } from "../types/creator.types";
import { ImageService } from "../service/external/image.service";

export class CreatorAdapter implements Adapter<CreatorExternal, Creator> {

  private imageService: ImageService = new ImageService();

  public async toInternal(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageService.save(external.thumbnail);

    return {
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

  public async toInternalSave(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageService.save(external.thumbnail);

    return {
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
      series: [],
      stories: [],
      comics: [],
      events: [],
    };
  }
}
