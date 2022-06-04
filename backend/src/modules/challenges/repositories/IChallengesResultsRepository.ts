import ICreateChallengeResultsDTO from "../dtos/ICreateChallengeResultsDTO";
import ChallengeResults from "../infra/typeorm/entities/ChallengeResults";

interface IChallengesResultsRepository {
  listByID(id: string): Promise<ChallengeResults>;
  listByChallengeID(challengeID: string): Promise<ChallengeResults>;
  create(data: ICreateChallengeResultsDTO): Promise<void>;
}

export { IChallengesResultsRepository };
