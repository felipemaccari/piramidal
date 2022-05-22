import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Email already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({ name, email, password: passwordHash });
  }
}

export default CreateUserUseCase;
