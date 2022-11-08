import ICreateChallengeResultsDTO from "../dtos/ICreateChallengeResultsDTO";
import ChallengeResults from "../infra/typeorm/entities/ChallengeResults";

interface IChallengesResultsRepository {
  list(): Promise<ChallengeResults[]>;
  listByID(id: string): Promise<ChallengeResults>;
  listByChallengeID(challengeID: string): Promise<ChallengeResults>;
  create(data: ICreateChallengeResultsDTO): Promise<void>;
}

export { IChallengesResultsRepository };
