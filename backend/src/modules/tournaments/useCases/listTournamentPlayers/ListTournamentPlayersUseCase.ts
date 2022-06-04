import { inject, injectable } from "tsyringe";

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
    private tournamentsRepository: ITournamentsRepository
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

    return tournamentPlayers;
  }
}

export default ListTournamentPlayersUseCase;
