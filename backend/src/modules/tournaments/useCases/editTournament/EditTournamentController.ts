import { Request, Response } from "express";
import { container } from "tsyringe";

import EditTournamentUseCase from "./EditTournamentUseCase";

class EditTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tournamentID } = request.params;
    const { description, initialDate, finalDate, active, finished } =
      request.body;

    const editTournamentUseCase = container.resolve(EditTournamentUseCase);

    await editTournamentUseCase.execute({
      description,
      initialDate,
      finalDate,
      active,
      finished,
      tournamentID,
    });

    return response.send();
  }
}

export default EditTournamentController;
