export interface ICrudRepository<Entity> {
    findAll(): Promise<Entity[]>;

    findAllPage(skip: number, limit: number): Promise<Entity[]>;

    findById(id: string): Promise<Entity | null>;

    create(data: Entity): Promise<Entity | void>;

    update(id: string, data: Entity): Promise<void>;

    delete(id: string): Promise<void>;
}
