import { Request, Response } from "express";
import { container } from "tsyringe";

import ListActiveTournamentUseCase from "./ListActiveTournamentUseCase";

class ListActiveTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listActiveTournamentControllerUseCase = container.resolve(
      ListActiveTournamentUseCase
    );

    const activeTournament =
      await listActiveTournamentControllerUseCase.execute();

    return response.status(201).json(activeTournament);
  }
}

export default ListActiveTournamentController;
