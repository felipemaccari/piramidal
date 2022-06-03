interface ICreateChallengeResultsDTO {
  gameDate: Date;
  originPlayerGiveup: boolean;
  destinationPlayerGiveup: boolean;
  refused: boolean;
  expired: boolean;
  originPlayerFirstSet: number;
  destinationPlayerFirstSet: number;
  originPlayerSecondSet: number;
  destinationPlayerSecondSet: number;
  originPlayerTiebreak: number;
  destinationPlayerTiebreak: number;
  originPlayerPoints: number;
  destinationPlayerPoints: number;
  challengeID: string;
}

export default ICreateChallengeResultsDTO;
