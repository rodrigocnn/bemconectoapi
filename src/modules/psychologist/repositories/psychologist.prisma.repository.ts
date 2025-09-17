import type { PrismaClient } from "../../../../prisma/generated/prisma";

import { IPsychologistRepository } from "./psychologist.repository";
import { PsychologistResponseDTO } from "../dtos/response-psychologist.dto";
import { CreatePsychologistDTO } from "../dtos/create-psychologist.dto";
import { PsychologistMapper } from "../mappers/ psychologist.mapper";

export class PsychologistPrismaRepository implements IPsychologistRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreatePsychologistDTO): Promise<PsychologistResponseDTO> {
    const psychologist = await this.prisma.psychologist.create({ data });
    return PsychologistMapper.toDTO(psychologist);
  }

  async read(): Promise<PsychologistResponseDTO[]> {
    const psychologists = await this.prisma.psychologist.findMany();
    return PsychologistMapper.toDTOs(psychologists);
  }

  async findByEmail(email: string) {
    return this.prisma.psychologist.findUnique({ where: { email } });
  }

  async show(id: string) {
    return this.prisma.psychologist.findFirst({ where: { id: id } });
  }
}
