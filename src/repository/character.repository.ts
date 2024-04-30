import { Model } from 'mongoose';
import { Character } from '../types/character.types';
import { CrudRepository } from './crud.repository';
import { Comic } from '../types/comic.types';

export class CharacterRepository extends CrudRepository<Character> {
    constructor(model: Model<Character>) {
        super(model);
    }

    public async create(character: Character): Promise<Character> {
        return this.model.create(character);
    }

    public async createAll(characters: Character[]): Promise<void> {
        await this.model.create(characters);
    }

    public async findComicsByCharacter(id: string): Promise<Comic[] | null> {
        return this.model.findById(id, { comics: 1 }).populate('comics');
    }
}
