import { Model } from "mongoose";
import { Character } from "types/character.types";
import characterModel from "../schema/character.schema";

export class CharacterRepository {
  private characterModel: Model<Character>;

  constructor() {
    this.characterModel = characterModel;
  }

  public async create(character: Character) {
    this.characterModel.create(character);
  }
}
