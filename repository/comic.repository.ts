import { Model } from "mongoose";
import comicModel from "../schema/comic.schema";
import { Comic } from "types/comic.types";

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
    for (const comic of comics) {
        await this.comicModel.updateOne({ id: comic.id }, comic);
    }
  }
}
