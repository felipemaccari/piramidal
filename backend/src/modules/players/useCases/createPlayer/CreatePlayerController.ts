import { Request, Response } from "express";
import { container } from "tsyringe";

import CreatePlayerUseCase from "@modules/players/useCases/createPlayer/CreatePlayerUseCase";

class CreatePlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, active } = request.body;

    const createPlayersUseCase = container.resolve(CreatePlayerUseCase);

    await createPlayersUseCase.execute({ name, phone, active });

    return response.status(201).send();
  }
}

export default CreatePlayerController;
