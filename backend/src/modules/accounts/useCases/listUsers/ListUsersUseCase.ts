import { inject, injectable } from "tsyringe";

import User from "@modules/accounts/infra/typeorm/entities/User";
import UsersRepository from "@modules/accounts/repositories/implementations/UsersRepository";

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
