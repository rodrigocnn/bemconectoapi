import type { PrismaClient } from "../../../../prisma/generated/prisma";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { ResponseUserDTO } from "../dtos/response-user.dto";
import { IUserRepository } from "./user.repository";

export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<ResponseUserDTO> {
    const user = await this.prisma.user.create({ data });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      psychologistId: user.psychologistId ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async read(): Promise<ResponseUserDTO[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      psychologistId: user.psychologistId ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    }));
  }

  async show(id: string): Promise<ResponseUserDTO | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      psychologistId: user.psychologistId ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }

  async update(
    id: string,
    data: CreateUserDTO
  ): Promise<ResponseUserDTO | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      psychologistId: user.psychologistId ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt ?? null,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user !== null;
  }
}
