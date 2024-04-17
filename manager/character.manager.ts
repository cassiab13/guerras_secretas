import { Character } from '../types/character.types';
import { CharacterRepository } from 'repository/character.repository';

export class CharacterManager {

    private static instance: CharacterManager | null = null;
    private static uriByObjectId: Map<string, Character> = new Map();
    private static readonly repository: CharacterRepository = new CharacterRepository();
    
    public static getInstance(): CharacterManager {

        if(!CharacterManager.instance) {
            CharacterManager.instance = new CharacterManager();
        }

        return CharacterManager.instance;
    }

    public static async findCharacter(character: Character): Promise<Character> {
        
        if (CharacterManager.uriByObjectId.has(character.resourceURI)) {
            return CharacterManager.uriByObjectId.get(character.resourceURI)!;
        }

        return this.saveCharacter(character);
    }
    
    private static async saveCharacter(character: Character): Promise<Character> {
        
        const newCharacter: Character = await CharacterManager.repository.create(character);
        CharacterManager.uriByObjectId.set(newCharacter.resourceURI, newCharacter);
        
        return newCharacter; 
    }

    private async populateUriByObjectId(): Promise<void> {

        const characters: Character[] = await CharacterManager.repository.findAll();
        characters.map(character => {
            CharacterManager.uriByObjectId.set(character.resourceURI, character);
        });
    }

    private constructor() {
        this.populateUriByObjectId();
    }

}