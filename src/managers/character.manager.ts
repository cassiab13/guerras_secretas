import { Character } from '../types/character.types';
import { CharacterRepository } from '../repository/character.repository';

export class CharacterManager {

    private static instance: CharacterManager | null = null;
    private static characterById: Map<number, Character> = new Map();
    private static readonly repository: CharacterRepository = new CharacterRepository();
    
    public static getInstance(): CharacterManager {

        if(!CharacterManager.instance) {
            CharacterManager.instance = new CharacterManager();
        }

        return CharacterManager.instance;
    }

    public async findCharacter(character: Character): Promise<Character> {
        
        if (CharacterManager.characterById.has(character.id)) {
            return CharacterManager.characterById.get(character.id)!;
        }

        return this.saveCharacter(character);
    }
    
    private async saveCharacter(character: Character): Promise<Character> {
        
        const newCharacter: Character = await CharacterManager.repository.create(character);
        CharacterManager.characterById.set(newCharacter.id, newCharacter);
        
        return newCharacter; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const characters: Character[] = await CharacterManager.repository.findAll();
        characters.map(character => {
            CharacterManager.characterById.set(character.id, character);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}