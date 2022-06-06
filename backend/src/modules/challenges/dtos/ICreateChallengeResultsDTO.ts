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
  challengeID: string;
  originPlayerPoints?: number;
  destinationPlayerPoints?: number;
}

export default ICreateChallengeResultsDTO;
