// clients.service.spec.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthService } from "./auth.service";
import { IAuthRepository } from "../repositories/auth.repository";

import { LoginUserDTO } from "../dtos/login-user.dto";

function makeLogin(): LoginUserDTO {
  return {
    email: "rodrigo@gmail.com",
    password: "hashed_password",
  };
}

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UsersService", () => {
  let mockAuthRepository: IAuthRepository;
  let authService: AuthService;

  beforeEach(() => {
    mockAuthRepository = {
      findByEmail: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_jwt_token");
    authService = new AuthService(mockAuthRepository);
  });

  it("should authenticate a user", async () => {
    const login = {
      ...makeLogin(),
      id: "fake-uuid-1234",
    };

    (mockAuthRepository.findByEmail as jest.Mock).mockResolvedValue(login);

    const result = await authService.login({
      email: login.email,
      password: "zxc123",
    });

    const expectedUserAuth = {
      id: "fake-uuid-1234",
      email: "rodrigo@gmail.com",
      token: "fake_jwt_token",
      expiresIn: "1d",
    };

    expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith(login.email);
    expect(bcrypt.compare).toHaveBeenCalledWith("zxc123", login.password);
    expect(result).toEqual(expectedUserAuth);
  });

  it("should throw an error when the user provides an incorrect password", async () => {
    const login = {
      ...makeLogin(),
      id: "fake-uuid-1234",
    };
    (mockAuthRepository.findByEmail as jest.Mock).mockResolvedValue(login);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login({
        email: login.email,
        password: "zxc123",
      })
    ).rejects.toThrow("Email ou Password Incorrect");
  });

  it("should return null when the user is not found", async () => {
    const login = {
      ...makeLogin(),
      id: "fake-uuid-1234",
    };
    (mockAuthRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.login({
        email: login.email,
        password: "zxc123",
      })
    ).rejects.toThrow("Email ou Password Incorrect");
  });
});
