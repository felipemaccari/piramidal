import { inject, injectable } from "tsyringe";

import IEditPlayerDTO from "@modules/players/dtos/IEditPlayerDTO";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class EditPlayerUseCase {
  constructor(
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository
  ) {}

  async execute(data: IEditPlayerDTO): Promise<void> {
    const player = await this.playersRepository.findByID(data.id);

    if (!player) {
      throw new AppError("Player not found");
    }

    await this.playersRepository.edit({ ...player, ...data });
  }
}

export default EditPlayerUseCase;
