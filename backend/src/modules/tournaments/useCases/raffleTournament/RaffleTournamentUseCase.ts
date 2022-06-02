import { inject, injectable } from "tsyringe";

import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

@injectable()
class RaffleTournamentUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository
  ) {}

  async execute(): Promise<Player[]> {
    const players = await this.playersRepository.list();

    const raffledPlayers = players
      .map((player) => ({
        player,
        sortIndex: Math.random(),
      }))
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map(({ player }) => player);

    return raffledPlayers;
  }
}

export default RaffleTournamentUseCase;
