import { ComicTextExternal } from "dto/external/comic-text-external.dto";
import { ComicText } from "types/comit-text.types";
import { Adapter } from "./adapter";

export class ComicTextAdapter implements Adapter<ComicTextExternal, ComicText> {

  public async toInternal(external: ComicTextExternal): Promise<ComicText> {

    return {
      type: external.type,
      language: external.language,
      text: external.text,
    };
  }
}
