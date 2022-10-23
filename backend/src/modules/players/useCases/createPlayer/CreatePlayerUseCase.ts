import { inject, injectable } from "tsyringe";

import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  phone: string;
  active: boolean;
}

@injectable()
class CreatePlayerUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository
  ) {}

  async execute({ name, phone, active }: IRequest): Promise<void> {
    const playerAlreadyExists = await this.playersRepository.findByName(name);

    if (playerAlreadyExists) {
      throw new AppError("Player already exists");
    }

    await this.playersRepository.create({ name, phone, active });
  }
}

export default CreatePlayerUseCase;
