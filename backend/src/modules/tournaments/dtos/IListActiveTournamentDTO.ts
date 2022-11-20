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

type ActiveTournament = {
  id?: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  active: boolean;
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ChallengePlayer = {
  id: string;
  name: string;
  phone: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  activeOnTournament: boolean;
  playerID: string;
  tournamentID: string;
};

type ActiveTournamentPlayers = {
  player: ChallengePlayer;
  activeChallenge?: ActiveChallenge;
};

interface IListActiveTournamentDTO {
  tournament: ActiveTournament;
  players: Array<ActiveTournamentPlayers>;
}

export default IListActiveTournamentDTO;
