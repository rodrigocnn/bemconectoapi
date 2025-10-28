import type { PrismaClient } from "../../../../prisma/generated/prisma";
import type {
  IDashboardRepository,
  DashboardEntity,
  AppointmentStatus,
} from "./dashboard.repository";

export class DashboardPrismaRepository implements IDashboardRepository {
  constructor(private prisma: PrismaClient) {}

  private getRepository(entity: DashboardEntity) {
    return this.prisma[entity] as any;
  }

  // ======= Genéricos =======
  async getTotal(entity: DashboardEntity): Promise<number> {
    return this.getRepository(entity).count();
  }

  async getTotalCurrentMonth(entity: DashboardEntity): Promise<number> {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return this.getRepository(entity).count({
      where: { createdAt: { gte: start, lt: end } },
    });
  }

  async getTotalLastMonth(entity: DashboardEntity): Promise<number> {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const end = new Date(date.getFullYear(), date.getMonth(), 1);
    return this.getRepository(entity).count({
      where: { createdAt: { gte: start, lt: end } },
    });
  }

  // ======= Genéricos por status =======
  private async getAppointmentCountByStatus(
    status: AppointmentStatus,
    start?: Date,
    end?: Date,
  ) {
    return this.prisma.appointment.count({
      where: {
        status,
        ...(start && end ? { createdAt: { gte: start, lt: end } } : {}),
      },
    });
  }

  async getTotalByStatus(status: AppointmentStatus): Promise<number> {
    return this.getAppointmentCountByStatus(status);
  }

  async getTotalByStatusCurrentMonth(
    status: AppointmentStatus,
  ): Promise<number> {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return this.getAppointmentCountByStatus(status, start, end);
  }

  async getTotalByStatusLastMonth(status: AppointmentStatus): Promise<number> {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const end = new Date(date.getFullYear(), date.getMonth(), 1);
    return this.getAppointmentCountByStatus(status, start, end);
  }

  async getTotalNewPatientsByMonth(month: string): Promise<number> {
    const monthMap: Record<string, number> = {
      janeiro: 0,
      fevereiro: 1,
      março: 2,
      abril: 3,
      maio: 4,
      junho: 5,
      julho: 6,
      agosto: 7,
      setembro: 8,
      outubro: 9,
      novembro: 10,
      dezembro: 11,
    };

    const numberOfMonth = monthMap[month.toLowerCase()];
    if (numberOfMonth === undefined) {
      throw new Error(`Mês inválido: ${month}`);
    }

    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, numberOfMonth, 1);
    const end = new Date(currentYear, numberOfMonth + 1, 1);

    return this.getRepository("patient").count({
      where: {
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });
  }
}
