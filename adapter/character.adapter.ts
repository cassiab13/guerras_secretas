import { ImageAdapter } from "./image.adapter";
import { CharacterExternal } from "dto/external/character-external.dto";
import { Adapter } from "./adapter";
import { Character } from "types/character.types";
import { ImageRepository } from "repository/image.repository";
import { CharacterRepository } from "repository/character.repository";

export class CharacterAdapter implements Adapter<CharacterExternal, Character> {
  private characterRepository: CharacterRepository = new CharacterRepository();
  private imageAdapter: ImageAdapter = new ImageAdapter();
  private ImageRepository: ImageRepository = new ImageRepository();

  public async toInternal(external: CharacterExternal): Promise<Character> {
    return {
      name: external.name,
      description: external.description,
      modified: new Date(external.modified),
      resourceURI: external.resourceURI,
      // thumbnail:
      comics: [],
      stories: [],
      events: [],
      series: [],
    };
  }
}
