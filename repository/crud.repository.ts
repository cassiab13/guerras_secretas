import { ICrudRepository } from "interfaces/crud.repository";
import { FilterQuery, Model, UpdateQuery } from "mongoose";

export class CrudRepository<T> implements ICrudRepository<T> {
  protected readonly model: Model<T>;

  constructor(schema: Model<T>) {
    this.model = schema;
  }

  public async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  public async update(id: string, data: T): Promise<void> {
    this.model.updateOne(
      { _id: id } as FilterQuery<T>,
      data as unknown as UpdateQuery<T>
    );
  }

  public async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }
}
