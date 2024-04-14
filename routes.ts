import { Router } from "express";
import { ExternalService } from './service/external/event.service';
import { ExternalController } from './controller/external/external.controller';

const routes = Router()

const externalService = new ExternalService();
const externalController = new ExternalController(externalService);

routes.post('/external/:id', externalController.save.bind(externalController));

export default routes;