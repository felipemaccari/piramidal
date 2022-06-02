import { inject, injectable } from "tsyringe";

import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

@injectable()
class ListPlayersUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository
  ) {}

  async execute(): Promise<Player[]> {
    return await this.playersRepository.list();
  }
}

export default ListPlayersUseCase;
