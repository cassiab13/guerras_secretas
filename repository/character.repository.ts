import { Model } from "mongoose";
import { Character } from "types/character.types";
import characterModel from "../schema/character.schema";

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
    for (const character of characters) {
        await this.characterModel.updateOne({ id: character.id }, character);
    }
  }
}
