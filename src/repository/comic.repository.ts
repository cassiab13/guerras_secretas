import { Model } from "mongoose";
import { Comic } from "src/types/comic.types";
import { CrudRepository } from "./crud.repository";

export class ComicRepository extends CrudRepository<Comic> {

  constructor(model: Model<Comic>) {
    super(model);
  }

  public async create(comic: Comic): Promise<Comic> {
    return this.model.create(comic);
  }

  public async updateMany(comics: Comic[]): Promise<void> {
    const comicIds = comics.map(comic => comic.id);
    await this.model.updateMany({ id: { $in: comicIds } }, { $set: comics });
  }
}
