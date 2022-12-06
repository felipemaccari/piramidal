interface ICreateTournamentPlayerDTO {
  playerID: string;
  position?: number;
  lineNumber?: number;
  tournamentID: string;
}

export default ICreateTournamentPlayerDTO;
