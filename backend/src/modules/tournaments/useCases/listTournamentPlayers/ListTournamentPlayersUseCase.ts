import { inject, injectable } from "tsyringe";

import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import TournamentPlayer from "@modules/tournaments/infra/typeorm/entities/TournamentPlayer";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListTournamentPlayersUseCase {
  constructor(
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository,
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository
  ) {}

  async execute(tournamentID: string): Promise<TournamentPlayer[]> {
    const tournamentExists = await this.tournamentsRepository.findByID(
      tournamentID
    );

    if (!tournamentExists) {
      throw new AppError("Tournament does not exists");
    }

    const tournamentPlayers =
      await this.tournamentsPlayersRepository.findByTournamentID(tournamentID);
    const players = await this.playersRepository.list();

    const fullTournamentPlayers = tournamentPlayers.map((tournamentPlayer) => {
      const playerInformation = players.find(
        (player) => player.id === tournamentPlayer.playerID
      );

      return { ...tournamentPlayer, ...playerInformation };
    });

    const sortedTournamentPlayers = fullTournamentPlayers.sort(
      (previous, next) => previous.position - next.position
    );

    return sortedTournamentPlayers;
  }
}

export default ListTournamentPlayersUseCase;
