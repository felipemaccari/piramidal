import ICreateChallengeResultsDTO from "../dtos/ICreateChallengeResultsDTO";
import ChallengeResults from "../infra/typeorm/entities/ChallengeResults";

interface IChallengesResultsRepository {
  listById(id: string): Promise<ChallengeResults>;
  create(data: ICreateChallengeResultsDTO): Promise<void>;
}

export { IChallengesResultsRepository };
