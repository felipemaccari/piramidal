import ICreateTournamentPlayerDTO from "../dtos/ICreateTournamentPlayerDTO";
import TournamentPlayer from "../infra/typeorm/entities/TournamentPlayer";

interface ITournamentsPlayersRepository {
  create(data: ICreateTournamentPlayerDTO): Promise<void>;
  list(): Promise<TournamentPlayer[]>;
}

export default ITournamentsPlayersRepository;
