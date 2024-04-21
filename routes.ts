import { Router } from "express";
import { PopulateController } from "./src/controller/populate.controller";
import { PopulateService } from "./src/service/populate.service";
import { userRoutes } from "./src/routes/user.routes";
import { comicRoutes } from "./src/routes/comic.routes";
import { ErrorMiddleware } from "./src/middlewares/error";

const errorMiddleware: ErrorMiddleware = new ErrorMiddleware();
const routes = Router()

const populateService = new PopulateService();
const populateController = new PopulateController(populateService);

routes.use('/users', userRoutes);
routes.use('/comics', comicRoutes);
routes.post('/populate/:id', populateController.save.bind(populateController));
routes.use(errorMiddleware.catchError.bind(errorMiddleware))

export default routes;