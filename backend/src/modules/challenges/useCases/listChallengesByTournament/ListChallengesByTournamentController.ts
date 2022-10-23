import { Request, Response } from "express";
import { container } from "tsyringe";

import ListChallengesByTournamentUseCase from "./ListChallengesByTournamentUseCase";

class ListChallengesByTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;

    const listChallengesByTournamentUseCase = container.resolve(
      ListChallengesByTournamentUseCase
    );

    const challengeResults = await listChallengesByTournamentUseCase.execute(
      tournamentID
    );

    return response.status(201).json(challengeResults);
  }
}

export default ListChallengesByTournamentController;
