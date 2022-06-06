import ICreateTournamentPlayerDTO from "../dtos/ICreateTournamentPlayerDTO";
import IEditTournamentPlayerDTO from "../dtos/IEditTournamentPlayerDTO";
import TournamentPlayer from "../infra/typeorm/entities/TournamentPlayer";

interface ITournamentsPlayersRepository {
  create(data: ICreateTournamentPlayerDTO): Promise<void>;
  findByTournamentID(tournamentID: string): Promise<TournamentPlayer[]>;
  findTournamentPlayerByID(id: string): Promise<TournamentPlayer>;
  editTournamentPlayer(player: IEditTournamentPlayerDTO): Promise<void>;
}

export default ITournamentsPlayersRepository;
