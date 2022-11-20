import { Request, Response } from "express";
import { container } from "tsyringe";

import ListTournamentResultsUseCase from "./ListTournamentResultsUseCase";

class ListTournamentResultsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;

    const listTournamentResultsUseCase = container.resolve(
      ListTournamentResultsUseCase
    );

    const tournamentResults = await listTournamentResultsUseCase.execute(
      tournamentID
    );

    return response.status(201).json(tournamentResults);
  }
}

export default ListTournamentResultsController;
