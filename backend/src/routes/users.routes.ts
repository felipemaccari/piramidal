import { Router } from "express";

import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import ListUsersController from "../modules/accounts/useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.get("/", listUsersController.handle);

usersRoutes.post("/", createUserController.handle);

export default usersRoutes;
