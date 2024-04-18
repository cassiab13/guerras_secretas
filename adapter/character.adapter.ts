import { ImageAdapter } from "./image.adapter";
import { CharacterExternal } from "dto/external/character-external.dto";
import { Adapter } from "./adapter";
import { Character } from "types/character.types";
import { ImageRepository } from "../repository/image.repository";
import { Image } from "../types/image.types";
import { ImageService } from "../service/external/image.service";

export class CharacterAdapter implements Adapter<CharacterExternal, Character> {

  private imageService: ImageService = new ImageService();

  public async toInternal(external: CharacterExternal): Promise<Character> {
  
    const image = await this.imageService.save(external.thumbnail);

    return {
      id: external.id,
      name: external.name,
      description: external.description,
      modified: new Date(external.modified),
      resourceURI: external.resourceURI,
      thumbnail: image,
      comics: external.comics,
      stories: external.stories,
      events: external.events,
      series: external.series,
    };
  }

  public async toInternalSave(external: CharacterExternal): Promise<Character> {
  
    const image = await this.imageService.save(external.thumbnail);

    return {
      id: external.id,
      name: external.name,
      description: external.description,
      modified: new Date(external.modified),
      resourceURI: external.resourceURI,
      thumbnail: image,
      comics: [],
      stories: [],
      events: [],
      series: [],
    };
  }
}
