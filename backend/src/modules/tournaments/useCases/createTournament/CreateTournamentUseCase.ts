import { inject, injectable } from "tsyringe";

import ICreateTournamentPlayerDTO from "@modules/tournaments/dtos/ICreateTournamentPlayerDTO";
import ICreateTournamentRequestDTO from "@modules/tournaments/dtos/ICreateTournamentRequestDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";

@injectable()
class CreateTournamentUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository
  ) {}

  async execute({
    description,
    initialDate,
    finalDate,
    players,
  }: ICreateTournamentRequestDTO): Promise<void> {
    const tournament = { description, initialDate, finalDate };

    const { id: tournamentID } = await this.tournamentsRepository.create(
      tournament
    );

    const raffledPlayers = players
      .map((player) => ({
        player,
        sortIndex: Math.random(),
      }))
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map(({ player }) => player);

    raffledPlayers.map(async (playerID, index) => {
      const tournamentPlayer: ICreateTournamentPlayerDTO = {
        playerID,
        position: index,
        tournamentID,
      };

      await this.tournamentsPlayersRepository.create(tournamentPlayer);
    });
  }
}

export default CreateTournamentUseCase;
