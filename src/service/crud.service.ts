import { KeyRedis } from "../utils/key-redis.utils";
import { StatusCode } from "../enums/status.code";
import { ICrudRepository } from "../interfaces/crud.repository";
import { ICrudService } from "../interfaces/crud.service";
import { NotFoundError } from "../utils/errors/not-found.error";
import { getRedis, setRedis } from "../../redisConfig";

export abstract class CrudService<Entity> implements ICrudService<Entity> {
  
    protected readonly repository: ICrudRepository<Entity>;
    
    constructor(repository: ICrudRepository<Entity>) {
        this.repository = repository;
    }

    public async create(data: Entity): Promise<void> {
        this.repository.create(data);
    }
    
    public async update(id: string, data: Entity): Promise<void> {

        await this.findById(id);
        this.repository.update(id, data);

    }

    public async delete(id: string): Promise<void> {
        this.repository.delete(id);
    }
  
    public async find(id: string): Promise<Entity> {
        return this.findById(id);
    }
  
    public async findAll(page: number, pageSize: number): Promise<Entity[]> {
        
        const skip = (page - 1) * pageSize;
        const hashRedis: string = KeyRedis.findPage(this.getClassName(), skip, pageSize);
        const value: string | null | undefined = await getRedis(hashRedis);

        if (value) {
            return JSON.parse(value);
        }

        const result: Entity[] = await this.repository.findAllPage(skip, pageSize);
        setRedis(hashRedis, JSON.stringify(result));
        return result;
    }

    private async findById(id: string): Promise<Entity> {
        
        const value: Entity | null = await this.repository.findById(id);
        
        if (!value) {
            throw new NotFoundError("Id not found", StatusCode.NOT_FOUND);
        }
        
        return value;
        
    }

    public getClassName(): string {
        return this.constructor.name;
    }

}
