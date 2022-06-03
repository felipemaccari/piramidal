import ICreateChallengeDTO from "@modules/challenges/dtos/ICreateChallengeDTO";
import Challenge from "@modules/challenges/infra/typeorm/entities/Challenge";

interface IChallengesRepository {
  list(): Promise<Challenge[]>;
  create(data: ICreateChallengeDTO): Promise<void>;
  findById(id: string): Promise<Challenge>;
}

export { IChallengesRepository };
