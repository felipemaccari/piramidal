import { Request, Response } from "express";
import { container } from "tsyringe";

import RaffleTournamentUseCase from "./RaffleTournamentUseCase";

class RaffleTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;

    const raffleTournamentUseCase = container.resolve(RaffleTournamentUseCase);

    const raffledPlayers = await raffleTournamentUseCase.execute(tournamentID);

    return response.status(201).json(raffledPlayers);
  }
}

export default RaffleTournamentController;
