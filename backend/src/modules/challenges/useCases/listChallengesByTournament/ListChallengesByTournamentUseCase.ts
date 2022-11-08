import { inject, injectable } from "tsyringe";

import Challenge from "@modules/challenges/infra/typeorm/entities/Challenge";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import { IPlayersRepository } from "@modules/players/repositories/IPlayersRepository";

@injectable()
class ListChallengesByTournamentUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengeRepository: IChallengesRepository,
    @inject("PlayersRepository")
    private playersRepository: IPlayersRepository,
    @inject("ChallengesResultsRepository")
    private challengesResultsRepository: IChallengesResultsRepository
  ) {}

  async execute(tournamentID: string): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.findByTournamentID(
      tournamentID
    );

    const players = await this.playersRepository.list();

    const challengesWithPlayerInformation: Challenge[] = await Promise.all(
      challenges.map(async (challenge) => {
        const originPlayerInformation = players.find(
          (player) => player.id === challenge.originPlayerID
        );

        const destinationPlayerInformation = players.find(
          (player) => player.id === challenge.destinationPlayerID
        );

        const challengeResults =
          await this.challengesResultsRepository.listByChallengeID(
            challenge.id
          );

        return {
          ...challenge,
          gameDate: challengeResults?.gameDate || null,
          originPlayerName: originPlayerInformation.name,
          destinationPlayerName: destinationPlayerInformation.name,
        };
      })
    );

    return challengesWithPlayerInformation;
  }
}

export default ListChallengesByTournamentUseCase;
