import ICreateTournamentDTO from "@modules/tournaments/dtos/ICreateTournamentDTO";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";

import IEditTournamentDTO from "../dtos/IEditTournamentDTO";

interface ITournamentsRepository {
  create(data: ICreateTournamentDTO): Promise<Tournament>;
  list(): Promise<Tournament[]>;
  findByID(id: string): Promise<Tournament>;
  edit(data: IEditTournamentDTO): Promise<void>;
  findActive(): Promise<Tournament>;
  delete(id: string): Promise<void>;
}

export default ITournamentsRepository;
