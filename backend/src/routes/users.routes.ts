import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import ListUsersController from "../modules/accounts/useCases/listUsers/ListUsersController";
import UpdateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.use(ensureAuthenticated);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export default usersRoutes;
