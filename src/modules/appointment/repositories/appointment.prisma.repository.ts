import type { PrismaClient } from "../../../../prisma/generated/prisma";
import { IAppointmentRepository } from "./appointment.repository";

import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { ResponseAppointmentDTO } from "../dtos/response-appointment.dto";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateAppointmentDTO): Promise<ResponseAppointmentDTO> {
    const appointment = await this.prisma.appointment.create({
      data: {
        start: new Date(data.start),
        end: new Date(data.end),
        status: data.status ?? "PENDING",
        psychologist: { connect: { id: data.psychologistId } },
        patient: { connect: { id: data.patientId } },
      },
    });

    return appointment;
  }

  async read(): Promise<ResponseAppointmentDTO[]> {
    const appointments = await this.prisma.appointment.findMany();
    return appointments;
  }

  async update(
    id: string,
    data: CreateAppointmentDTO
  ): Promise<ResponseAppointmentDTO | null> {
    return await this.prisma.appointment.update({
      where: { id },
      data: {
        ...data,
        start: new Date(data.start),
        end: new Date(data.end),
      },
    });
  }

  async show(id: string): Promise<ResponseAppointmentDTO | null> {
    return await this.prisma.appointment.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.appointment.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.prisma.appointment.findUnique({
      where: { id },
    });
    return result !== null;
  }
}
