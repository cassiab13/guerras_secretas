import { ImageAdapter } from "./image.adapter";
import { ComicExternal } from "dto/external/comic-external.dto";
import { Adapter } from "./adapter";
import { Comic } from "types/comic.types";

export class ComicAdapter implements Adapter<ComicExternal, Comic> {

  private imageAdapter: ImageAdapter = new ImageAdapter();

  public async toInternal(external: ComicExternal): Promise<Comic> {
  
    const image = await this.imageAdapter.toInternal(external.thumbnail);

    return {
      _id: null,
      id: external.id,
      digitalId: external.digitalId,
      title: external.title,
      issueNumber: external.issueNumber,
      variantDescription: external.variantDescription,
      description: external.description,
      modified: new Date(external.modified),
      isbn: external.isbn,
      upc: external.upc,
      diamondCode: external.diamondCode,
      ean: external.ean,
      issn: external.issn,
      format: external.format,
      pageCount: external.pageCount,
      resourceURI: external.resourceURI,
      textObjects: [],
      serie: null,
      dates: [],
      prices: [],
      thumbnail: image,
      images: external.images,
      creators: external.creators,
      characters: external.characters,
      stories: external.stories,
      events: external.events,
    };
  }
}
