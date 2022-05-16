import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import UsersRepository from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "7c7fc106b1403da55bdcf64adadf9c24"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(sub);

    if (!user) {
      throw new Error("User does not exists");
    }

    next();
  } catch {
    throw new Error("Invalid token");
  }
};

export default ensureAuthenticated;
