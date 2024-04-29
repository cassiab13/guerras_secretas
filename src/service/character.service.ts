import { CharacterRepository } from 'src/repository/character.repository';
import { CrudService } from './crud.service';
import { Character } from 'src/types/character.types';
import { Comic } from 'src/types/comic.types';

export class CharacterService extends CrudService<Character> {
    constructor(repository: CharacterRepository) {
        super(repository);
    }

    public async findComicsByCharacter(id: string): Promise<Comic[]> {
        const character: Character | null = await this.find(id);
        const comics = character.comics as Comic[];
        return comics;
    }
}
