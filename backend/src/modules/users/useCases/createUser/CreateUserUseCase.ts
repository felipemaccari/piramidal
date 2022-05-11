import { inject, injectable } from "tsyringe";

import UsersRepository from "../../repositories/implementations/UsersRepository";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: UsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    await this.userRepository.create({ name, email, password });
  }
}

export default CreateUserUseCase;
