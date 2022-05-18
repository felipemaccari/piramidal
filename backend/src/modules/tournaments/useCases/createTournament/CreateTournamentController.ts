import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateTournamentUseCase from "@modules/tournaments/useCases/createTournament/CreateTournamentUseCase";

class CreateTournamentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, initialDate, finalDate } = request.body;

    const createTournamentUseCase = container.resolve(CreateTournamentUseCase);

    createTournamentUseCase.execute({ description, initialDate, finalDate });

    return response.status(201).send();
  }
}

export default CreateTournamentController;
