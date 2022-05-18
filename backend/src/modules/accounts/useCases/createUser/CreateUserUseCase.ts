import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import UsersRepository from "../../repositories/implementations/UsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: UsersRepository
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
