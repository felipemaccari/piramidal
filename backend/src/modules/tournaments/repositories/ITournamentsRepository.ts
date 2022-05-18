import Tournament from "@modules/tournaments/entities/Tournament";

interface ITournamentsRepository {
  create({ description, initialDate, finalDate }): Promise<void>;
  list(): Promise<Tournament[]>;
  findById(id: string): Promise<Tournament>;
}

export default ITournamentsRepository;
