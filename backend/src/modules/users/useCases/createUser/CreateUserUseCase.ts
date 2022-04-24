import UsersRepository from "../../repositories/implementations/UsersRepository";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  execute({ name, email, password }: ICreateUserDTO): void {
    const userAlreadyExists = this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    this.userRepository.create({ name, email, password });
  }
}

export default CreateUserUseCase;
