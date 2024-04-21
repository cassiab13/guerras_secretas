import { Model } from "mongoose";
import characterModel from "../schema/character.schema";
import { Character } from "../types/character.types";

export class CharacterRepository {
  private characterModel: Model<Character>;

  constructor() {
    this.characterModel = characterModel;
  }

  public async create(character: Character): Promise<Character> {
    return this.characterModel.create(character);
  }

  public async findAll(): Promise<Character[]> {
    return characterModel.find();
  }

  public async updateMany(characters: Character[]): Promise<void> {
    const characterIds = characters.map(character => character.id);
    await this.characterModel.updateMany({ id: { $in: characterIds } }, { $set: characters });
  }
}
