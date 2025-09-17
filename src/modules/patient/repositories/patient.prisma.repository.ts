import type { PrismaClient } from "../../../../prisma/generated/prisma";
import { IPatientRepository } from "./patient.repository";

import { CreatePatientDTO } from "../dtos/create-patient.dto";
import { ResponsePatientDTO } from "../dtos/response-patient.dto";

export class PatientPrismaRepository implements IPatientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreatePatientDTO) {
    return this.prisma.patient.create({ data });
  }

  async read(): Promise<ResponsePatientDTO[]> {
    const patients = await this.prisma.patient.findMany({
      where: { deletedAt: null },
    });
    return patients;
  }

  async update(
    id: string,
    data: CreatePatientDTO
  ): Promise<ResponsePatientDTO | null> {
    return await this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async show(id: string): Promise<ResponsePatientDTO | null> {
    return await this.prisma.patient.findFirst({ where: { id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.patient.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.prisma.patient.findUnique({
      where: { id },
    });

    return result !== null;
  }
}
