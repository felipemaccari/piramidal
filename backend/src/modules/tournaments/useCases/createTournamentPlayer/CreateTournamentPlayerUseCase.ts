import { inject, injectable } from "tsyringe";

import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import ICreateTournamentPlayerDTO from "@modules/tournaments/dtos/ICreateTournamentPlayerDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateTournamentPlayerUseCase {
  constructor(
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository,
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository
  ) {}

  async execute({
    playerID,
    tournamentID,
  }: ICreateTournamentPlayerDTO): Promise<void> {
    const tournamentExists = await this.tournamentsRepository.findByID(
      tournamentID
    );

    if (!tournamentExists) {
      throw new AppError("Tournament does not exists");
    }

    const playerExists = await this.playersRepository.findByID(playerID);

    if (!playerExists) {
      throw new AppError("Player does not exists");
    }

    const tournamentPlayers =
      await this.tournamentsPlayersRepository.findByTournamentID(tournamentID);

    await this.tournamentsPlayersRepository.create({
      playerID,
      tournamentID,
      position: tournamentPlayers.length,
    });
  }
}

export default CreateTournamentPlayerUseCase;
