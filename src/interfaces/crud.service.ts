export interface ICrudService<Entity> {

    findAll(page: number, pageSize: number): Promise<Entity[]>;

    find(id: string): Promise<Entity>;
    
    create(data: Entity): Promise<void>; // Verificar de passar um DTO

    update(id: string, data: Entity): Promise<void>; // Verificar de passar um DTO

    delete(id: string): Promise<void>;

    getClassName(): string;

}
