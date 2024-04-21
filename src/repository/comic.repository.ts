import { Model } from "mongoose";
import comicModel from "../schema/comic.schema";
import { Comic } from "src/types/comic.types";

export class ComicRepository {
  private readonly comicModel: Model<Comic>;

  constructor() {
    this.comicModel = comicModel;
  }

  public async create(comic: Comic): Promise<Comic> {
    return this.comicModel.create(comic);
  }

  public async findAll(): Promise<Comic[]> {
    return comicModel.find();
  }

  public async updateMany(comics: Comic[]): Promise<void> {
    const comicIds = comics.map(comic => comic.id);
    await this.comicModel.updateMany({ id: { $in: comicIds } }, { $set: comics });
  }
}
