import { Serie } from "types/serie.types";
import { SaveHandler } from "./save.handler";
import { CollectionURI } from "dto/external/collection-uri.dto";

export class SaveComicHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    public async save(serie: Serie): Promise<Serie> {
        

        if (this.nextHandler) {
            return this.nextHandler.save(serie);
        }

        return serie;

    }

}