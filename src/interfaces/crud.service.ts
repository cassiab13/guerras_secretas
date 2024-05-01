import { ResponseApi } from "../types/response-api.types";
import { Find } from "../utils/find.utils";

export interface ICrudService<Entity> {

    findAll(find: Find): Promise<ResponseApi<Entity[]>>;

    find(id: string): Promise<Entity>;
    
    create(data: Entity): Promise<void>; // Verificar de passar um DTO

    update(id: string, data: Entity): Promise<void>; // Verificar de passar um DTO

    delete(id: string): Promise<void>;

    getClassName(): string;

}
