interface IListTournamentResultsDTO {
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
  challengesAsOrigin: number;
  pointsAsOrigin: number;
  pointsAsDestination: number;
  challengesAsDestination: number;
}

export default IListTournamentResultsDTO;
