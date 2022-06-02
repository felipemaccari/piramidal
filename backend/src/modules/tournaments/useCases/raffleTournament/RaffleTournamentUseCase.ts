import { inject, injectable } from "tsyringe";

import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class RaffleTournamentUseCase {
  constructor(
    @inject("PlayersRepository") private playersRepository: IPlayersRepository,
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository
  ) {}

  async execute(tournamentId: string): Promise<Player[]> {
    const tournament = await this.tournamentsRepository.findById(tournamentId);

    if (!tournament) {
      throw new AppError("Tournament not found");
    }

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
