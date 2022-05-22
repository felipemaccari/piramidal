import { inject, injectable } from "tsyringe";

import Player from "@modules/players/infra/typeorm/entities/Player";
import PlayersRepository from "@modules/players/infra/typeorm/repositories/PlayersRepository";

@injectable()
class ListPlayersUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: PlayersRepository
  ) {}

  async execute(): Promise<Player[]> {
    return await this.playersRepository.list();
  }
}

export default ListPlayersUseCase;
