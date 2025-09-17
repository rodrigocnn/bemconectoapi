import { hash } from "bcrypt";

import { CreatePsychologistDTO } from "../dtos/create-psychologist.dto";
import { IPsychologistRepository } from "../repositories/psychologist.repository";
import { PsychologistResponseDTO } from "../dtos/response-psychologist.dto";

export class PsychologistService {
  constructor(private psychologistRepository: IPsychologistRepository) {}

  async create(data: CreatePsychologistDTO) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const hashedPassword = await hash(data.password, saltRounds);

    const psychologistToCreate = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.psychologistRepository.create(psychologistToCreate);
    return user;
  }

  async read(): Promise<PsychologistResponseDTO[]> {
    return this.psychologistRepository.read();
  }
  async show(id: string): Promise<PsychologistResponseDTO> {
    return this.psychologistRepository.show(id);
  }
}
