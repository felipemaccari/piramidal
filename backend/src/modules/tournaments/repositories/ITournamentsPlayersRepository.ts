import ICreateTournamentPlayerDTO from "../dtos/ICreateTournamentPlayerDTO";
import TournamentPlayer from "../infra/typeorm/entities/TournamentPlayer";

interface ITournamentsPlayersRepository {
  create(data: ICreateTournamentPlayerDTO): Promise<void>;
  findByTournamentID(tournamentID: string): Promise<TournamentPlayer[]>;
}

export default ITournamentsPlayersRepository;
