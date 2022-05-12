import Challenge from "../entities/Challenge";

interface ICreateChallengeDTO {
  challengeePlayer: string;
  challengedPlayer: string;
  initialDate: Date;
  finalDate: Date;
  gameDate: Date;
  challengeeGiveup: boolean;
  challengedGiveup: boolean;
  refused: boolean;
  expired: boolean;
  challengeeFirstSet: number;
  challengedFirstSet: number;
  challengeeSecondSet: number;
  challengedSecondSet: number;
  challengeeTiebreak: number;
  challengedTiebreak: number;
  challengeePoints: number;
  challengedPoints: number;
}

interface IChallengesRepository {
  list(): Promise<Challenge[]>;
  create({
    challengeePlayer,
    challengedPlayer,
    initialDate,
    finalDate,
    gameDate,
    challengeeGiveup,
    challengedGiveup,
    refused,
    expired,
    challengeeFirstSet,
    challengedFirstSet,
    challengeeSecondSet,
    challengedSecondSet,
    challengeeTiebreak,
    challengedTiebreak,
    challengeePoints,
    challengedPoints,
  }: ICreateChallengeDTO): Promise<void>;
}

export { IChallengesRepository, ICreateChallengeDTO };
