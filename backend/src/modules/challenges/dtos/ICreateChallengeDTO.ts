interface ICreateChallengeDTO {
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
  challengeePlayerID: string;
  challengedPlayerID: string;
  tournamentID: string;
}

export default ICreateChallengeDTO;
