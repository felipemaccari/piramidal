import User from "../models/User";
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ name, email, password }: ICreateUserDTO): void {
    const user = new User();

    Object.assign(user, { name, email, password, created_at: new Date() });

    this.users.push(user);
  }

  list(): User[] {
    return this.users;
  }

  findByEmail(email: string): User {
    const duplicatedUser = this.users.find((user) => user.email === email);

    return duplicatedUser;
  }
}

export default UsersRepository;
