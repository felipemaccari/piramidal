import { Request, Response } from "express";
import { container } from "tsyringe";

import ListPlayersUseCase from "./ListPlayersUseCase";

class ListPlayersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPlayersUseCase = container.resolve(ListPlayersUseCase);

    const players = await listPlayersUseCase.execute();

    return response.status(201).json(players);
  }
}

export default ListPlayersController;
