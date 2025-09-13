import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PsychologistService } from "./user.service";
import { IPsychologistRepository } from "../repositories/user.repository";
import { CreatePsychologistDTO } from "../dtos/create-user.dto";

export function makePsychologist(): CreatePsychologistDTO {
  return {
    name: "Rodrigo César",
    birth: "1990-05-15",
    email: "rodrigo@gmail.com",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    crp: "06/123456",
    password: "hashed_password",
    phone: "(11) 98765-4321",
    specialty: "Terapia Cognitivo-Comportamental",
  };
}

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("PsychologistService", () => {
  let mockPsychologistRepository: IPsychologistRepository;
  let psychologistService: PsychologistService;

  beforeEach(() => {
    mockPsychologistRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_jwt_token");
    psychologistService = new PsychologistService(mockPsychologistRepository);
  });

  describe("create", () => {
    it("should create a client successfully", async () => {
      const psychologistData = makePsychologist();
      const expectedPsychologist = {
        id: "dd682b13-476e-4830-9f51-60aeb3cb4e7c",
        ...psychologistData,
        password: "hashed_password",
        createdAt: "2025-08-31T18:16:54.236Z",
        updatedAt: "2025-08-31T18:16:54.236Z",
      };

      (mockPsychologistRepository.create as jest.Mock).mockResolvedValue(
        expectedPsychologist
      );

      const result = await psychologistService.create(psychologistData);

      expect(mockPsychologistRepository.create).toHaveBeenCalledWith(
        psychologistData
      );
      expect(result).toEqual(expectedPsychologist);
    });
  });
});
