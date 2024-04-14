
export interface SaveHandler {

    setNext(handler: SaveHandler): SaveHandler;

    save(url: string): void;

}