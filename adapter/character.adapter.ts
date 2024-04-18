import { ImageAdapter } from "./image.adapter";
import { CharacterExternal } from "dto/external/character-external.dto";
import { Adapter } from "./adapter";
import { Character } from "types/character.types";

export class CharacterAdapter implements Adapter<CharacterExternal, Character> {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: CharacterExternal): Promise<Character> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);

    return {
      _id: null,
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
}
