import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PsychologistService } from "./psychologist.service";
import { IPsychologistRepository } from "../repositories/psychologist.repository";
import { CreatePsychologistDTO } from "../dtos/create-psychologist.dto";
import {
  psychologistData,
  psychologistResponse,
} from "../_mocks_/psycholist.mocks";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("PsychologistService", () => {
  let mockRepo: IPsychologistRepository;
  let psychologistService: PsychologistService;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake_jwt_token");
    psychologistService = new PsychologistService(mockRepo);
  });

  describe("create", () => {
    it("should create a client successfully", async () => {
      (mockRepo.create as jest.Mock).mockResolvedValue(psychologistResponse);

      const result = await psychologistService.create(psychologistData);

      expect(mockRepo.create).toHaveBeenCalledWith(psychologistData);
      expect(result).toEqual(psychologistResponse);
    });
  });
});
