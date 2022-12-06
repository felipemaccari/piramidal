import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvaliableDestinationUserUseCase from "./ListAvaliableDestinationUserUseCase";

class ListAvaliableDestinationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { playerID, tournamentID } = request.params;

    const listAvaliableDestinationUserUseCase = container.resolve(
      ListAvaliableDestinationUserUseCase
    );

    const challenges = await listAvaliableDestinationUserUseCase.execute(
      playerID,
      tournamentID
    );

    return response.status(201).json(challenges);
  }
}

export default ListAvaliableDestinationUserController;
