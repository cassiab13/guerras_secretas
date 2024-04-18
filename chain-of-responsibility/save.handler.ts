import { Serie } from "t../../types/serie.types";

export interface SaveHandler {

    setNext(handler: SaveHandler): SaveHandler;

    save(serie: Serie): Promise<Serie>;

}