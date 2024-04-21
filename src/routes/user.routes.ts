import { Router } from "express";
import { UserRepository } from "../repository/user.repository";
import userModel from '../schema/user.schema';
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import Authenticate from "../middlewares/authenticate";

const userRoutes = Router()

const userRepository: UserRepository = new UserRepository(userModel);
const userService: UserService = new UserService(userRepository);
const userController: UserController = new UserController(userService);

userRoutes.post('', userController.create.bind(userController));
userRoutes.post('/auth', userController.auth.bind(userController))
userRoutes.get('/:id', userController.findById.bind(userController))
userRoutes.get('', userController.findAll.bind(userController))
userRoutes.put('/:id', userController.update.bind(userController))
userRoutes.delete('/:id', userController.delete.bind(userController))

export { userRoutes }
