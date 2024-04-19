import { ICrudRepository } from "interfaces/crud.repository";
import { ICrudService } from "interfaces/crud.service";

export class CrudService<T> implements ICrudService<T> {
  protected readonly repository: ICrudRepository<T>;

  constructor(repository: ICrudRepository<T>) {
    this.repository = repository;
  }

  public async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  public async update(id: string, data: T): Promise<void> {
    await this.repository.findById(id);
    return this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  public async findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  public async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }
}
