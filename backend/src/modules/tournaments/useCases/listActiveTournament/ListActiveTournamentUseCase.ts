import { inject, injectable } from "tsyringe";

import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";
import IListActiveTournamentDTO from "@modules/tournaments/dtos/IListActiveTournamentDTO";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import ITournamentsRepository from "@modules/tournaments/repositories/ITournamentsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListActiveTournamentUseCase {
  constructor(
    @inject("TournamentsPlayersRepository")
    private tournamentPlayersRepository: ITournamentsPlayersRepository,
    @inject("TournamentsRepository")
    private tournamentsRepository: ITournamentsRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository,
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository,
    @inject("ChallengesResultsRepository")
    private challengesResultsRepository: IChallengesResultsRepository
  ) {}

  async execute(): Promise<IListActiveTournamentDTO[]> {
    const activeTournament = await this.tournamentsRepository.findActive();

    if (!activeTournament) {
      throw new AppError("Tournament does not exists");
    }

    const tournamentPlayers =
      await this.tournamentPlayersRepository.findByTournamentID(
        activeTournament.id
      );
    const players = await this.playersRepository.list();
    const tournamentPlayersWithPlayerInformation = tournamentPlayers.map(
      (tournamentPlayer) => {
        const playerInformation = players.find(
          (player) => player.id === tournamentPlayer.playerID
        );

        return { ...tournamentPlayer, ...playerInformation };
      }
    );

    const challenges = await this.challengesRepository.findByTournamentID(
      activeTournament.id
    );
    const challengesResults = await this.challengesResultsRepository.list();

    const activeChallenges = challenges.filter(
      (challenge) =>
        !challengesResults.some((result) => result.challengeID === challenge.id)
    );

    const tournamentPlayersWithChallenges =
      tournamentPlayersWithPlayerInformation.map((player) => {
        const playerChallenge = activeChallenges.find(
          (challenge) =>
            challenge.originPlayerID === player.id ||
            challenge.destinationPlayerID === player.id
        );

        if (playerChallenge) {
          const originPlayerInformation = players.find(
            (player) => player.id === playerChallenge.originPlayerID
          );

          const destinationPlayerInformation = players.find(
            (player) => player.id === playerChallenge.destinationPlayerID
          );

          return {
            ...player,
            activeChallenge: {
              ...playerChallenge,
              originPlayerName: originPlayerInformation.name,
              destinationPlayerName: destinationPlayerInformation.name,
            },
          };
        }

        return { ...player };
      });

    return tournamentPlayersWithChallenges;
  }
}

export default ListActiveTournamentUseCase;
