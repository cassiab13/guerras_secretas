import { Router } from "express";
import comicModel from '../schema/comic.schema';
import { ComicRepository } from "../repository/comic.repository";
import { ComicService } from "../service/comic.service";
import { ComicController } from "../controller/comic.controller";
import { Validate } from "../middlewares/validate";

const comicRoutes = Router()

const comicRepository: ComicRepository = new ComicRepository(comicModel);
const comicService: ComicService = new ComicService(comicRepository);
const comicController: ComicController = new ComicController(comicService);

comicRoutes.post('', comicController.create.bind(comicController));
comicRoutes.get('/:id', comicController.findById.bind(comicController));
comicRoutes.get('', comicController.findAll.bind(comicController));
comicRoutes.put('/:id', comicController.update.bind(comicController));
comicRoutes.delete('/:id', comicController.delete.bind(comicController));

export { comicRoutes }
