import { CharacterExternal } from "dto/external/character-external.dto";
import { Adapter } from "./adapter";
import { Character } from "types/character.types";
import { ImageAdapter } from "./image.adapter";

export class CharacterAdapter implements Adapter<CharacterExternal, Character> {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: CharacterExternal): Promise<Character> {
  
    const image = await this.imageAdapter.toInternal(external?.thumbnail);

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
  
    const image = await this.imageAdapter.toInternal(external?.thumbnail);
    const modified: Date = new Date(external?.modified); 
    const date: Date | null = isNaN(modified.getTime()) ? null : modified;

    return {
      id: external.id,
      name: external.name,
      description: external.description,
      modified: date,
      resourceURI: external.resourceURI,
      thumbnail: image,
      comics: [],
      stories: [],
      events: [],
      series: [],
    };
  }
}
