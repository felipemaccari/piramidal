import { inject, injectable } from "tsyringe";

import ICreateChallengeResultsDTO from "@modules/challenges/dtos/ICreateChallengeResultsDTO";
import ChallengeResults from "@modules/challenges/infra/typeorm/entities/ChallengeResults";
import { IChallengesRepository } from "@modules/challenges/repositories/IChallengesRepository";
import { IChallengesResultsRepository } from "@modules/challenges/repositories/IChallengesResultsRepository";
import ITournamentsPlayersRepository from "@modules/tournaments/repositories/ITournamentsPlayersRepository";
import AppError from "@shared/errors/AppError";
import AppDataSource from "@shared/infra/typeorm";

import {
  PLAYER_POINTS_NOTHING_TWO,
  PLAYER_POINTS_ONE_TWO,
  PLAYER_POINTS_TWO_NOTHING,
  PLAYER_POINTS_TWO_ONE,
  EXPIRED_GAME_POINTS,
  GUIVEN_UP_EXCEED_GAME_POINTS,
} from "../../../../../utils/constants";

@injectable()
class CreateChallengeResultsUseCase {
  private originPlayerPoints: number;
  private destinationPlayerPoints: number;

  constructor(
    @inject("ChallengesResultsRepository")
    private challengeResultsRepository: IChallengesResultsRepository,
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository,
    @inject("TournamentsPlayersRepository")
    private tournamentsPlayersRepository: ITournamentsPlayersRepository
  ) {
    this.originPlayerPoints = 0;
    this.destinationPlayerPoints = 0;
  }

  handlePlayersPontuationBySets = ({
    originPlayerFirstSet,
    destinationPlayerFirstSet,
    originPlayerSecondSet,
    destinationPlayerSecondSet,
    originPlayerTiebreak,
    destinationPlayerTiebreak,
  }: ICreateChallengeResultsDTO) => {
    if (originPlayerTiebreak > destinationPlayerTiebreak) {
      this.originPlayerPoints = PLAYER_POINTS_TWO_ONE;
      this.destinationPlayerPoints = PLAYER_POINTS_ONE_TWO;
      return;
    }

    if (originPlayerTiebreak < destinationPlayerTiebreak) {
      this.originPlayerPoints = PLAYER_POINTS_ONE_TWO;
      this.destinationPlayerPoints = PLAYER_POINTS_TWO_ONE;
      return;
    }

    if (
      originPlayerFirstSet > destinationPlayerFirstSet &&
      originPlayerSecondSet > destinationPlayerSecondSet
    ) {
      this.originPlayerPoints = PLAYER_POINTS_TWO_NOTHING;
      this.destinationPlayerPoints = PLAYER_POINTS_NOTHING_TWO;
      return;
    }

    if (
      originPlayerFirstSet < destinationPlayerFirstSet &&
      originPlayerSecondSet < destinationPlayerSecondSet
    ) {
      this.originPlayerPoints = PLAYER_POINTS_NOTHING_TWO;
      this.destinationPlayerPoints = PLAYER_POINTS_TWO_NOTHING;
    }
  };

  async execute(data: ICreateChallengeResultsDTO): Promise<void> {
    const { challengeID } = data;

    const challengeExists = await this.challengesRepository.findByID(
      challengeID
    );

    if (!challengeExists) {
      throw new AppError("Challenge does not exists");
    }

    if (data.refused) {
      const refusedChallengesByDestinationPlayer =
        await AppDataSource.getRepository(ChallengeResults)
          .createQueryBuilder("challengesResults")
          .leftJoinAndSelect("challengesResults.challengeID", "challenges")
          .where("challenges.destinationPlayerID = :destinationPlayerID", {
            destinationPlayerID: challengeExists.destinationPlayerID,
          })
          .andWhere("challengesResults.refused = true")
          .getMany();

      if (refusedChallengesByDestinationPlayer.length > 0) {
        throw new AppError("This player already has refused an challenge");
      }
    }

    if (data.destinationPlayerGiveup) {
      const givenUpChallengesByDestinationPlayer =
        await AppDataSource.getRepository(ChallengeResults)
          .createQueryBuilder("challengesResults")
          .leftJoinAndSelect("challengesResults.challengeID", "callenges")
          .where("challenges.destinationPlayerID = :destinationPlayerID", {
            destinationPlayerID: challengeExists.destinationPlayerID,
          })
          .andWhere("challengesResults.destinationPlayerGiveup = true")
          .getMany();

      if (givenUpChallengesByDestinationPlayer.length > 1) {
        this.destinationPlayerPoints = GUIVEN_UP_EXCEED_GAME_POINTS;
      }
    }

    if (data.originPlayerGiveup) {
      const challenges = await this.challengesRepository.list();
      const challengeResults = await this.challengeResultsRepository.list();

      const originPlayerChallenges = challenges
        .filter(
          (challenge) =>
            challenge.originPlayerID === challengeExists.originPlayerID ||
            challenge.destinationPlayerID === challengeExists.originPlayerID
        )
        .map((challenge) => challenge.id);

      const originPlayerResults = challengeResults.filter((results) =>
        originPlayerChallenges.includes(results.challengeID)
      );

      if (originPlayerResults.length > 1) {
        this.originPlayerPoints = GUIVEN_UP_EXCEED_GAME_POINTS;
      }
    }

    if (data.expired) {
      this.originPlayerPoints = EXPIRED_GAME_POINTS;
      this.destinationPlayerPoints = EXPIRED_GAME_POINTS;
      return;
    }

    if (this.originPlayerPoints === 0 && this.destinationPlayerPoints === 0) {
      this.handlePlayersPontuationBySets(data);
    }

    if (this.originPlayerPoints > this.destinationPlayerPoints) {
      const tournamentPositions =
        await this.tournamentsPlayersRepository.findByTournamentID(
          challengeExists.tournamentID
        );

      const challengePlayersPositions = tournamentPositions.filter(
        (position) =>
          position.playerID === challengeExists.destinationPlayerID ||
          position.playerID === challengeExists.originPlayerID
      );

      console.log("challengePlayersPositions", challengePlayersPositions);

      const newPositions = [
        {
          ...challengePlayersPositions[0],
          position: challengePlayersPositions[1].position,
        },
        {
          ...challengePlayersPositions[1],
          position: challengePlayersPositions[0].position,
        },
      ];

      console.log("newPositions", newPositions);

      await this.tournamentsPlayersRepository.editTournamentPlayer(
        newPositions[0]
      );

      await this.tournamentsPlayersRepository.editTournamentPlayer(
        newPositions[1]
      );
    }

    await this.challengeResultsRepository.create({
      ...data,
      originPlayerPoints: this.originPlayerPoints,
      destinationPlayerPoints: this.destinationPlayerPoints,
    });
  }
}

export default CreateChallengeResultsUseCase;
