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

    let pyramidItems: any[] = [];
    let countIterator = 0;
    let quantity = 1;
    let playerPerLine = 2;
    let lineNumber = 1;

    while (countIterator < raffledPlayers.length) {
      pyramidItems = [
        ...pyramidItems,
        { players: raffledPlayers.slice(countIterator, quantity), lineNumber },
      ];

      countIterator = quantity;
      quantity = quantity + playerPerLine;
      playerPerLine = playerPerLine + 2;
      lineNumber++;
    }

    let position = 0;
    pyramidItems.map((item) => {
      return item.players.map(async (playerID) => {
        const tournamentPlayer: ICreateTournamentPlayerDTO = {
          playerID,
          position: position,
          lineNumber: item.lineNumber,
          tournamentID,
        };

        position++;

        await this.tournamentsPlayersRepository.create(tournamentPlayer);
      });
    });
  }
}

export default CreateTournamentUseCase;
