interface IEditTournamentDTO {
  description?: string;
  initialDate?: Date;
  finalDate?: Date;
  active?: boolean;
  finished?: boolean;
  tournamentID?: string;
  deletedAt?: Date;
}

export default IEditTournamentDTO;
