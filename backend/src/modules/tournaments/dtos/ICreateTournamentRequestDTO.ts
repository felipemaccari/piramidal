interface ICreateTournamentRequestDTO {
  description: string;
  initialDate: Date;
  finalDate: Date;
  players: string[];
}

export default ICreateTournamentRequestDTO;
