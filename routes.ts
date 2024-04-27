import { Router } from "express";
import { userRoutes } from "./src/routes/user.routes";
import { comicRoutes } from "./src/routes/comic.routes";
import { ErrorMiddleware } from "./src/middlewares/error";
import { populateRoutes } from "./src/routes/populate.routes";

const errorMiddleware: ErrorMiddleware = new ErrorMiddleware();
const routes = Router()

routes.use('/users', userRoutes);
routes.use('/comics', comicRoutes);
routes.use('/populate', populateRoutes);
routes.use(errorMiddleware.catchError.bind(errorMiddleware))

export default routes;