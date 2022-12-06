import { inject, injectable } from "tsyringe";

import Challenge from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import Player from "@modules/players/infra/typeorm/entities/Player";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import TournamentPlayer from "@modules/tournaments/infra/typeorm/entities/TournamentPlayer";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListAvaliableDestinationUserUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository,
    @inject("ChallengesRepository")
    private challengeRepository: IChallengesRepository,
    @inject("ChallengesResultsRepository")
    private challengesResultsRepository: IChallengesResultsRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository
  ) {}

  async execute(
    playerID: string,
    tournamentID: string
  ): Promise<TournamentPlayer[]> {
    const tournamentExists = await this.tournamentsRepository.findByID(
      tournamentID
    );

    if (!tournamentExists) {
      throw new AppError("This tournament does not exists");
    }

    const playerExists = await this.playersRepository.findByID(playerID);

    if (!playerExists) {
      throw new AppError("This player does not exists");
    }

    const players = await this.playersRepository.list();

    const tournamentPlayers =
      await this.tournamentsPlayersRepository.findByTournamentID(tournamentID);

    const tournamentPlayerInformation = tournamentPlayers.find(
      (player) => player.playerID === playerID
    );

    const tournamentPlayersAvaliable = tournamentPlayers.filter(
      (player) =>
        player.lineNumber === tournamentPlayerInformation.lineNumber - 1
    );

    const fullTournamentPlayers = tournamentPlayersAvaliable.map(
      (tournamentPlayer) => {
        const playerInformation = players.find(
          (player) => player.id === tournamentPlayer.playerID
        );

        return { ...tournamentPlayer, ...playerInformation };
      }
    );

    return fullTournamentPlayers;
  }
}

export default ListAvaliableDestinationUserUseCase;
