interface ICreateChallengeDTO {
  initialDate: Date;
  finalDate: Date;
  gameDate: Date;
  originPlayerGiveup: boolean;
  DestinationPlayerGiveup: boolean;
  refused: boolean;
  expired: boolean;
  originPlayerFirstSet: number;
  DestinationPlayerFirstSet: number;
  originPlayerSecondSet: number;
  DestinationPlayerSecondSet: number;
  originPlayerTiebreak: number;
  DestinationPlayerTiebreak: number;
  originPlayerPoints: number;
  DestinationPlayerPoints: number;
  originPlayerPlayerID: string;
  DestinationPlayerPlayerID: string;
  tournamentID: string;
}

export default ICreateChallengeDTO;
