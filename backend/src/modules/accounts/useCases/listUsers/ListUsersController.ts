import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUsersUseCase from "@modules/accounts/useCases/listUsers/ListUsersUseCase";

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute();

    return response.status(201).json(users);
  }
}

export default ListUsersController;
