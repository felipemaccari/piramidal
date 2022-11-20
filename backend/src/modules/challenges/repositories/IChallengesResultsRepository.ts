import ICreateChallengeResultsDTO from "../dtos/ICreateChallengeResultsDTO";
import Challenge from "../infra/typeorm/entities/Challenge";
import ChallengeResults from "../infra/typeorm/entities/ChallengeResults";

interface IChallengesResultsRepository {
  list(): Promise<ChallengeResults[]>;
  listByID(id: string): Promise<ChallengeResults>;
  listByChallengeID(challengeID: string): Promise<ChallengeResults>;
  listByChallengesIDS(chalenges: Array<Challenge>): Promise<ChallengeResults[]>;
  create(data: ICreateChallengeResultsDTO): Promise<void>;
}

export { IChallengesResultsRepository };
