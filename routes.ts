import { Router } from "express";
import { PopulateController } from "./src/controller/populate.controller";
import { PopulateService } from "./src/service/populate.service";
import { UserController } from "./src/controller/user.controller";

const routes = Router()

const testeController = new UserController();

const populateService = new PopulateService();
const populateController = new PopulateController(populateService);

routes.post('/populate/:id', populateController.save.bind(populateController));
routes.post('/post', testeController.create.bind(testeController));

export default routes;