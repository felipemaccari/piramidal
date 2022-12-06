import { Request, Response } from "express";
import { container } from "tsyringe";

import DeleteTournamentUseCase from "./DeleteTournamentUseCase";

class DeleteTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;

    const deleteTournamentController = container.resolve(
      DeleteTournamentUseCase
    );

    await deleteTournamentController.execute(tournamentID);

    return response.status(201).send();
  }
}

export default DeleteTournamentController;
