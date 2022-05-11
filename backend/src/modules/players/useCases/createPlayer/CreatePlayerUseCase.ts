import { inject, injectable } from "tsyringe";

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
      throw new Error("Player already exists");
    }

    await this.playersRepository.create({ name, phone });
  }
}

export default CreatePlayerUseCase;
