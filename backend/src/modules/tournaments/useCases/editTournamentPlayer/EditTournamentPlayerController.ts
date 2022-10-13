import { Request, Response } from "express";
import { container } from "tsyringe";

import EditTournamentPlayerUseCase from "./EditTournamentPlayerUseCase";

class EditTournamentPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentPlayerID } = request.params;
    const { activeOnTournament, position } = request.body;

    const editTournamentPlayerUseCase = container.resolve(
      EditTournamentPlayerUseCase
    );

    await editTournamentPlayerUseCase.execute({
      id: tournamentPlayerID,
      activeOnTournament,
      position,
    });

    return response.send();
  }
}

export default EditTournamentPlayerController;
