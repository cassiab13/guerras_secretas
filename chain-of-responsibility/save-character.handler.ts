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
    private toUpdate: any;
    private collectionUri: CollectionURI;

    constructor(toUpdate: any, collectionUri: CollectionURI) {
        this.toUpdate = toUpdate;
        this.collectionUri = collectionUri;
    }

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(): Promise<any> {

        const response: ResponseAPI<CharacterExternal>[] = await Request.findByCollection(this.collectionUri);
        await this.filterCharacters(this.toUpdate, response);

        if (this.nextHandler) {
            return this.nextHandler.save();
        }

        return this.toUpdate;

    }

    private async filterCharacters(type: any, response: ResponseAPI<CharacterExternal>[]): Promise<void> {

        type.characters = [];
        const allCharacters: CharacterExternal[] = response.map(response => response.data.results).flat();
        const sizeCharacters: number = allCharacters.length;
        
        for (let i = 0; i < sizeCharacters; i++) {

            const character: Character = await this.characterAdapter.toInternalSave(allCharacters[i]);
            const newCharacter: Character = await this.characterManager.findCharacter(character);

            type.characters.push(newCharacter);
            
        }
    
    }

}