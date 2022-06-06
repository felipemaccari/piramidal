import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateTournamentPlayerUseCase from "./CreateTournamentPlayerUseCase";

class CreateTournamentPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;
    const { playerID } = request.body;

    const createTournamentPlayerUseCase = container.resolve(
      CreateTournamentPlayerUseCase
    );

    await createTournamentPlayerUseCase.execute({ tournamentID, playerID });

    return response.status(201).send();
  }
}

export default CreateTournamentPlayerController;
