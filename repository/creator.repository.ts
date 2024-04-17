import { Model } from "mongoose";
import creatorModel from "../schema/creator.schema";
import { Creator } from "types/creator.types";

export class CreatorRepository {
  private readonly creatorModel: Model<Creator>;

  constructor() {
    this.creatorModel = creatorModel;
  }

  public async create(creator: Creator): Promise<Creator> {
    return this.creatorModel.create(creator);
  }

  public async findAll(): Promise<Creator[]> {
    return creatorModel.find();
  }
}
