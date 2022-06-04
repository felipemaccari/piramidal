import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";

interface ITournamentsRepository {
  create(data: ICreateTournamentDTO): Promise<Tournament>;
  list(): Promise<Tournament[]>;
  findByID(id: string): Promise<Tournament>;
}

export default ITournamentsRepository;
