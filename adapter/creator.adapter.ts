import { CreatorExternal } from "dto/external/creator-external.dto";
import { Adapter } from "./adapter";
import { Creator } from "../types/creator.types";
import { ImageAdapter } from "./image.adapter";
import { ImageRepository } from "../repository/image.repository";

export class CreatorAdapter implements Adapter<CreatorExternal, Creator> {

  private imageAdapter: ImageAdapter = new ImageAdapter();
  private readonly imageRepository: ImageRepository = new ImageRepository();

  public async toInternal(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);
    const newImage = await this.imageRepository.create(image);

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
      thumbnail: newImage,
      series: external.series,
      stories: external.stories,
      comics: external.comics,
      events: external.events,
    };
  }

  public async toInternalSave(external: CreatorExternal): Promise<Creator> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);
    const newImage = await this.imageRepository.create(image);

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
      thumbnail: newImage,
      series: [],
      stories: [],
      comics: [],
      events: [],
    };
  }
}
