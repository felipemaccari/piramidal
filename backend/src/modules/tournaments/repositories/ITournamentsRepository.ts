import Tournament from "../entities/Tournament";

interface ITournamentsRepository {
  create({ description, initialDate, finalDate }): Promise<void>;
  list(): Promise<Tournament[]>;
  findById({ id }): Promise<Tournament>;
}

export default ITournamentsRepository;
