import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import { IPlayersRepository } from "../../repositories/IPlayersRepository";

interface IRequest {
  name: string;
  phone: string;
}

@injectable()
class CreatePlayerUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository
  ) {}

  async execute({ name, phone }: IRequest): Promise<void> {
    const playerAlreadyExists = await this.playersRepository.findByName(name);

    if (playerAlreadyExists) {
      throw new AppError("Player already exists");
    }

    await this.playersRepository.create({ name, phone });
  }
}

export default CreatePlayerUseCase;
