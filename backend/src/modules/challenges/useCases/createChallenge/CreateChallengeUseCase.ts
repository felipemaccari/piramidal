import { inject, injectable } from "tsyringe";

import {
  IChallengesRepository,
  ICreateChallengeDTO,
} from "../../repositories/IChallengesRepository";

@injectable()
class CreateChallengeUseCase {
  constructor(
    @inject("ChallengesRepository")
    private challengesRepository: IChallengesRepository
  ) {}

  async execute(data: ICreateChallengeDTO): Promise<void> {
    await this.challengesRepository.create(data);
  }
}

export default CreateChallengeUseCase;
