import { Router } from "express";

import { PlayersRepository } from "../modules/players/repositories/PlayersRepository";
import { PostgresPlayersRepository } from "../modules/players/repositories/PostgresPlayersRepository";
import { CreatePlayerService } from "../modules/players/services/CreatePlayerService";

const playersRoutes = Router();
const playersRepository = new PostgresPlayersRepository();

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
