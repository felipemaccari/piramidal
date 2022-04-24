import User from "../../models/User";
import UsersRepository from "../../repositories/implementations/UsersRepository";

class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute(): User[] {
    return this.usersRepository.list();
  }
}

export default ListUsersUseCase;
