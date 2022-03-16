import { Router } from "express";

import { PlayersRepository } from "../repositories/PlayersRepository";
import { CreatePlayerService } from "../services/CreatePlayerService";

const playersRoutes = Router();
const playersRepository = new PlayersRepository();

playersRoutes.post("/", (request, response) => {
  const { name, phone } = request.body;

  const createPlayerService = new CreatePlayerService(playersRepository);

  createPlayerService.execute({ name, phone });

  return response.status(201).send();
});

playersRoutes.get("/", (request, response) => {
  const players = playersRepository.list();

  return response.status(201).json(players);
});

export { playersRoutes };
