import { inject, injectable } from "tsyringe";

import TournamentPlayer from "@modules/tournaments/infra/typeorm/entities/TournamentPlayer";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class RaffleTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository
  ) {}

  async execute(tournamentID: string): Promise<TournamentPlayer[]> {
    const tournament = await this.tournamentsRepository.findByID(tournamentID);

    if (!tournament) {
      throw new AppError("Tournament not found");
    }

    const tournamentPlayers =
      await this.tournamentsPlayersRepository.findByTournamentID(tournamentID);

    const raffledPlayers = tournamentPlayers
      .map((player) => ({
        player,
        sortIndex: Math.random(),
      }))
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map(({ player }) => player);

    await raffledPlayers.forEach(async (player, index) => {
      await this.tournamentsPlayersRepository.editTournamentPlayer({
        id: player.id,
        position: index,
      });
    });

    return raffledPlayers;
  }
}

export default RaffleTournamentUseCase;
