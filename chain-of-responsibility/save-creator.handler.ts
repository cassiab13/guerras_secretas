import { SaveHandler } from "./save.handler";
import { Serie } from "types/serie.types";

export class SaveCreatorHandler implements SaveHandler {

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