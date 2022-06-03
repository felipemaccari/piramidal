interface ICreateChallengeDTO {
  initialDate: Date;
  finalDate: Date;
  originPlayerID: string;
  destinationPlayerID: string;
  tournamentID: string;
}

export default ICreateChallengeDTO;
