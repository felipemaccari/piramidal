import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import IListTournamentResultsDTO from "@modules/tournaments/dtos/IListTournamentResultsDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListTournamentResultsUseCase {
  constructor(
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository,
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository,
    @inject("ChallengesResultsRepository")
    private challengesResultsRepository: IChallengesResultsRepository
  ) {}

  async execute(tournamentID: string): Promise<IListTournamentResultsDTO[]> {
    const tournament = await this.tournamentsRepository.findByID(tournamentID);

    if (!tournament) {
      throw new AppError("Tournament does not exists");
    }

    const tournamentPlayers =
      await this.tournamentsPlayersRepository.findByTournamentID(tournamentID);
    const players = await this.playersRepository.list();

    const tournamentPlayersInformation = tournamentPlayers.map(
      (tournamentPlayer) => {
        const playerInformation = players.find(
          (player) => player.id === tournamentPlayer.playerID
        );

        return { ...tournamentPlayer, ...playerInformation };
      }
    );

    const tournamentPlayersResults = await Promise.all(
      tournamentPlayersInformation.map(async (player) => {
        const challengesAsOrigin =
          await this.challengesRepository.findByOriginPlayerID(player.id);

        const challengesResultsAsOrigin =
          await this.challengesResultsRepository.listByChallengesIDS(
            challengesAsOrigin
          );

        let pointsAsOrigin = 0;
        if (challengesResultsAsOrigin.length > 0) {
          pointsAsOrigin = challengesResultsAsOrigin
            .filter((challenge) => challenge)
            .reduce(
              (total, currentChallengeResult) =>
                total + currentChallengeResult.originPlayerPoints,
              0
            );
        }

        const winAsOrigin = challengesResultsAsOrigin.filter(
          (challengesResults) =>
            challengesResults.originPlayerPoints >
            challengesResults.destinationPlayerPoints
        );

        const challengesAsDestination =
          await this.challengesRepository.findByDestinationPlayerID(player.id);

        const challengesResultsAsDestination =
          await this.challengesResultsRepository.listByChallengesIDS(
            challengesAsOrigin
          );
        let pointsAsDestination = 0;
        if (challengesResultsAsDestination.length > 0) {
          pointsAsDestination = challengesResultsAsDestination
            .filter((challenge) => challenge)
            .reduce(
              (total, currentChallengeResult) =>
                total + currentChallengeResult.destinationPlayerPoints,
              0
            );
        }
        const winAsDestination = challengesResultsAsDestination.filter(
          (challengeResult) =>
            challengeResult.destinationPlayerPoints >
            challengeResult.originPlayerPoints
        );

        return {
          ...player,
          challengesAsOrigin: challengesAsOrigin.length,
          pointsAsOrigin,
          pointsAsDestination,
          pointsTotal: pointsAsOrigin + pointsAsDestination,
          winAsDestination: winAsDestination.length,
          winAsOrigin: winAsOrigin.length,
          challengesAsDestination: challengesAsDestination.length,
        };
      })
    );

    return tournamentPlayersResults;
  }
}

export default ListTournamentResultsUseCase;
