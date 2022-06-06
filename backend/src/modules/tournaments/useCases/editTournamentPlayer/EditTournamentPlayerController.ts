import { Request, Response } from "express";
import { container } from "tsyringe";

import EditTournamentPlayerUseCase from "./EditTournamentPlayerUseCase";

class EditTournamentPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentPlayerID } = request.params;
    const { activeOnTournament } = request.body;

    const editTournamentPlayerUseCase = container.resolve(
      EditTournamentPlayerUseCase
    );

    await editTournamentPlayerUseCase.execute({
      id: tournamentPlayerID,
      activeOnTournament,
    });

    return response.send();
  }
}

export default EditTournamentPlayerController;
