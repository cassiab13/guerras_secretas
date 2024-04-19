import { Request, Response } from "express";

export interface ICrudController<T> {
  create(Req: Request, Res: Response): Promise<void>;
  update(Req: Request, Res: Response): Promise<void>;
  delete(Req: Request, Res: Response): Promise<void>;
  findById(Req: Request, Res: Response): Promise<void>;
  findAll(Req: Request, Res: Response): Promise<void>;
}
