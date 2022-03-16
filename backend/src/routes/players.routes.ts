import { Router } from "express";

import { Player } from "../models/Player";

const playersRoutes = Router();

const players: Player[] = [];

playersRoutes.post("/", (request, response) => {
  const { name, phone } = request.body;

  const player = new Player();

  Object.assign(player, { name, phone, created_at: new Date() });

  players.push(player);

  return response.status(201).json(players);
});

export { playersRoutes };
