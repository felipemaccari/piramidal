import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";

interface ITournamentsRepository {
  create({
    description,
    initialDate,
    finalDate,
  }: ICreateTournamentDTO): Promise<void>;
  list(): Promise<Tournament[]>;
  findById(id: string): Promise<Tournament>;
}

export default ITournamentsRepository;
