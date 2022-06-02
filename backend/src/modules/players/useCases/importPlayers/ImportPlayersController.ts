import { Request, Response } from "express";
import { container } from "tsyringe";

import ImportPlayersUseCase from "./ImportPlayersUseCase";

class ImportPlayersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importPlayersUseCase = container.resolve(ImportPlayersUseCase);

    await importPlayersUseCase.execute(file);

    return response.status(201).send();
  }
}

export default ImportPlayersController;
