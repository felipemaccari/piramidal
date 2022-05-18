import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";
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
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "7c7fc106b1403da55bdcf64adadf9c24"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
};

export default ensureAuthenticated;
