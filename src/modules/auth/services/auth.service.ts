import { compare } from "bcrypt";

import jwt from "jsonwebtoken";

import { LoginUserDTO } from "../dtos/login-user.dto";
import { ResponseLoginDTO } from "../dtos/response-login-user.dto";
import { IAuthRepository } from "../repositories/auth.repository";

export class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async login(user: LoginUserDTO): Promise<ResponseLoginDTO> {
    const userExist = await this.authRepository.findByEmail(user.email);

    if (!userExist) {
      const error = new Error("Email ou Password Incorrect");
      (error as any).statusCode = 401;
      throw error;
    }

    const passwordMatch = await compare(user.password, userExist.password);
    if (!passwordMatch) {
      const error = new Error("Email ou Password Incorrect");
      (error as any).statusCode = 401;
      throw error;
    }

    userExist.psychologistId;

    const token = jwt.sign(
      {
        sub: userExist.id,
        email: userExist.email,
        role: userExist.role,
        psychologistId: userExist.psychologistId,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      id: userExist.id,
      email: userExist.email,
      role: userExist.role,
      psychologistId: userExist.psychologistId,
      token,
      expiresIn: "1d",
    };
  }
}
