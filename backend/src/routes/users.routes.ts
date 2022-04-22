import { Router } from "express";

import UsersRepository from "../modules/users/repositories/UsersRepository";
import CreateUserService from "../modules/users/services/CreateUserService";

const usersRoutes = Router();
const userRepository = new UsersRepository();

usersRoutes.get("/", (request, response) => {
  const users = userRepository.list();

  return response.status(201).json(users);
});

usersRoutes.post("/", (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService(userRepository);

  createUserService.execute({ name, email, password });

  return response.status(201).send();
});

export default usersRoutes;
