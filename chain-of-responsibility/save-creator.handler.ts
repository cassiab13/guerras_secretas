import { SaveHandler } from "./save.handler";

export class SaveEventHandler implements SaveHandler {

    private nextHandler: SaveHandler | null = null
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    setNext(handler: SaveHandler): SaveHandler {
        this.nextHandler = handler;
        return handler;
    }

    save(): void {
        
    }

}