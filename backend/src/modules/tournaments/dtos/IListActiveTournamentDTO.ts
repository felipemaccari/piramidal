type ActiveChallenge = {
  id?: string;
  initialDate?: Date;
  finalDate?: Date;
  originPlayerID?: string;
  destinationPlayerID?: string;
  tournamentID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  originPlayerName?: string;
  destinationPlayerName?: string;
};

interface IListActiveTournamentDTO {
  id: string;
  position: number;
  activeOnTournament: boolean;
  playerID: string;
  tournamentID: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  active: boolean;
  activeChallenge?: ActiveChallenge;
}

export default IListActiveTournamentDTO;
