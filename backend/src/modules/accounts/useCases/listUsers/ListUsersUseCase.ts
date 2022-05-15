import { inject, injectable } from "tsyringe";

import User from "../../entities/User";
import UsersRepository from "../../repositories/implementations/UsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository
  ) {}

  async execute(): Promise<User[]> {
    return await this.usersRepository.list();
  }
}

export default ListUsersUseCase;
