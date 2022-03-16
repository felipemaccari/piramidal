import { Router } from "express";

import { PlayersRepository } from "../repositories/PlayersRepository";

const playersRoutes = Router();
const playersRepository = new PlayersRepository();

playersRoutes.post("/", (request, response) => {
  const { name, phone } = request.body;

  playersRepository.create({ name, phone });

  return response.status(201).send();
});

export { playersRoutes };
