import { Serie } from "types/serie.types";
import { SaveHandler } from "./save.handler";
import { CollectionURI } from "../dto/external/collection-uri.dto";
import { ResponseAPI } from "../dto/external/response-api.dto";
import { CharacterExternal } from "../dto/external/character-external.dto";
import { Request } from "../utils/external/request.utils";
import { CharacterAdapter } from "../adapter/character.adapter";
import { Character } from "../types/character.types";
import { CharacterManager } from "../manager/character.manager";

export class SaveCharacterHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null;
    private characterAdapter: CharacterAdapter = new CharacterAdapter();
    private characterManager: CharacterManager = CharacterManager.getInstance();

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        
        const uri: CollectionURI = serie.characters as CollectionURI;

        const response: ResponseAPI<CharacterExternal>[] = await Request.findByCollection(uri);
        await this.filterCharacters(serie, response);

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

    private async filterCharacters(serie: Serie, response: ResponseAPI<CharacterExternal>[]): Promise<void> {

        serie.characters = [];
        const allCharacters: CharacterExternal[] = response.map(response => response.data.results).flat();
        const sizeCharacters: number = allCharacters.length;
        
        for (let i = 0; i < sizeCharacters; i++) {

            const character: Character = await this.characterAdapter.toInternalSave(allCharacters[i]);
            const newCharacter: Character = await this.characterManager.findCharacter(character);

            serie.characters.push(newCharacter);
            
        }
    
    }

}