import { Request, Response } from "express";

import CreatePlayerUseCase from "./CreatePlayerUseCase";

class CreatePlayerController {
  constructor(public createPlayerUseCase: CreatePlayerUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, phone } = request.body;

    this.createPlayerUseCase.execute({ name, phone });

    return response.status(201).send();
  }
}

export default CreatePlayerController;
