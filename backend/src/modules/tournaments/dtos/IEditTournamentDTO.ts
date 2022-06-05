interface IEditTournamentDTO {
  description?: string;
  initialDate?: Date;
  finalDate?: Date;
  active?: boolean;
  finished?: boolean;
  tournamentID?: string;
}

export default IEditTournamentDTO;
