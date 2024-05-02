import { Router } from 'express';
import creatorModel from '../schema/creator.schema';
import { CreatorService } from '../service/creator.service';
import { CreatorRepository } from './../repository/creator.repository';
import { CreatorController } from '../controller/creator.controller';
import { createCreatorDTO } from '../dto/create.creator.dto';
import { Validate } from '../middlewares/validate';

const creatorRoutes = Router();

const creatorRepository: CreatorRepository = new CreatorRepository(
    creatorModel
);
const creatorService: CreatorService = new CreatorService(creatorRepository);
const creatorController: CreatorController = new CreatorController(
    creatorService
);

creatorRoutes.get('', creatorController.findAll.bind(creatorController));
creatorRoutes.post('', (req, res, next) => Validate.body(req, res, next, createCreatorDTO), creatorController.create.bind(creatorController));
creatorRoutes.get('/:id', creatorController.findById.bind(creatorController));
creatorRoutes.put('/:id', creatorController.update.bind(creatorController));
creatorRoutes.delete('/:id', creatorController.delete.bind(creatorController));
creatorRoutes.get(
    '/:id/comics',
    creatorController.findComicsByCreator.bind(creatorController)
);

export { creatorRoutes };
