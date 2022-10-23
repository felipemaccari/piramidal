import { Request, Response } from "express";
import { container } from "tsyringe";

import EditPlayerUseCase from "./EditPlayerUseCase";

class EditPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, phone, active } = request.body;

    const editPlayerUseCase = container.resolve(EditPlayerUseCase);

    await editPlayerUseCase.execute({
      id,
      name,
      phone,
      active,
    });

    return response.send();
  }
}

export default EditPlayerController;
