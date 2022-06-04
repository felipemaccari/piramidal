import { Request, Response } from "express";
import { container } from "tsyringe";

import ListTournamentPlayersUseCase from "./ListTournamentPlayersUseCase";

class ListTournamentPlayersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;

    const listTournamentPlayersUseCase = container.resolve(
      ListTournamentPlayersUseCase
    );

    const tournamentPlayers = await listTournamentPlayersUseCase.execute(
      tournamentID
    );

    return response.status(201).json(tournamentPlayers);
  }
}

export default ListTournamentPlayersController;
