import { Request, Response } from "express";

import ListUsersUseCase from "./ListUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const users = this.listUsersUseCase.execute();

    return response.status(201).json(users);
  }
}

export default ListUsersController;
