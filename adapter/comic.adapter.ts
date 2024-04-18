import { ComicExternal } from "dto/external/comic-external.dto";
import { Adapter } from "./adapter";
import { Comic } from "../types/comic.types";
import { Image } from "../types/image.types";
import { ImageService } from "../service/external/image.service";

export class ComicAdapter implements Adapter<ComicExternal, Comic> {

  private imageService: ImageService = new ImageService();

  public async toInternal(external: ComicExternal): Promise<Comic> {
  
    const image = await this.imageService.save(external.thumbnail);

    return {
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

  public async toInternalSave(external: ComicExternal): Promise<Comic> {
  
    const image = await this.imageService.save(external.thumbnail);

    const images: Image[] = [];
    external.images.forEach(async (image) => {
      images.push(await this.imageService.save(image));
    })

    return {
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
      images: images,
      creators: [],
      characters: [],
      stories: [],
      events: [],
    };
  }
}
