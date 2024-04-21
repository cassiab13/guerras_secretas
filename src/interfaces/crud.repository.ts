export interface ICrudRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}
