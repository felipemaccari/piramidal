import { Router } from "express";

import createUserController from "../modules/users/useCases/createUser";

const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
  const users = userRepository.list();

  return response.status(201).json(users);
});

usersRoutes.post("/", (request, response) =>
  createUserController.handle(request, response)
);

export default usersRoutes;
