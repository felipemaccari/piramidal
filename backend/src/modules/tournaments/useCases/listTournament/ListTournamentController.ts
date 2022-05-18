import { Request, Response } from "express";
import { container } from "tsyringe";

import ListTournamentUseCase from "@modules/tournaments/useCases/listTournament/ListTournamentUseCase";

class ListTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTournamentUseCase = container.resolve(ListTournamentUseCase);

    const tournaments = await listTournamentUseCase.execute();

    return response.status(201).json(tournaments);
  }
}

export default ListTournamentController;
