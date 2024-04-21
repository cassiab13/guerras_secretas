import { ICrudController } from "../interfaces/crud.controller";
import { ICrudService } from "../interfaces/crud.service";
import { Request, Response } from "express";

export class CrudController<T> implements ICrudController<T> {
    
  protected readonly crudService: ICrudService<T>;

  constructor(crudService: ICrudService<T>) {
    this.crudService = crudService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    const data: T = req.body;
    try {
      await this.crudService.create(data);
      res.status(201).json();
    } catch (error) {
      res.status(400).json();
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updatedData: T = req.body;
    try {
      await this.crudService.update(id, updatedData);
      res.status(200).json();
    } catch (error) {
      res.status(400).json();
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.crudService.delete(id);
      res.status(200).json();
    } catch {
      res.status(404).json();
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.crudService.findById(id);
      res.status(200).json();
    } catch {
      res.status(404).json();
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const allValues: T[] = await this.crudService.findAll();
      res.status(200).json(allValues);
    } catch {
      res.status(400).json();
    }
  }
}
