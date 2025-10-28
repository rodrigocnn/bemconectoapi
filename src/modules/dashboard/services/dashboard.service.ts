import type {
  IDashboardRepository,
  DashboardEntity,
  AppointmentStatus,
} from "../repositories/dashboard.repository";

export class DashboardService {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async index(): Promise<any> {
    const patients = await this.getEntityInfo("patient");
    const appointments = await this.getAppointmentInfo("appointment");
    const { chartNewPatients } = await this.getCharNewPatients();
    const { chartAppointments } = await this.getChartAppointments();

    return { patients, appointments, chartNewPatients, chartAppointments };
  }

  // ======= Pacientes e Appointments =======
  private async getEntityInfo(entity: DashboardEntity): Promise<any> {
    const total = await this.dashboardRepository.getTotal(entity);
    const totalCurrentMonth =
      await this.dashboardRepository.getTotalCurrentMonth(entity);

    return {
      total,
      totalCurrentMonth,
    };
  }

  // ======= Appointments com status específicos =======
  private async getAppointmentInfo(entity: DashboardEntity): Promise<any> {
    // Totais gerais
    const total = await this.dashboardRepository.getTotal(entity);
    const totalCurrentMonth =
      await this.dashboardRepository.getTotalCurrentMonth(entity);

    // Totais por status
    const completed = await this.getAppointmentStatusInfo("COMPLETED");
    const canceled = await this.getAppointmentStatusInfo("CANCELED");

    return {
      total,
      totalCurrentMonth,
      totalCompleted: completed.total,
      totalCompletedCurrentMonth: completed.totalCurrentMonth,
      totalCanceled: canceled.total,
      totalCanceledCurrentMonth: canceled.totalCurrentMonth,
    };
  }

  // ======= Método auxiliar genérico por status =======
  private async getAppointmentStatusInfo(status: AppointmentStatus) {
    const total = await this.dashboardRepository.getTotalByStatus(status);
    const totalCurrentMonth =
      await this.dashboardRepository.getTotalByStatusCurrentMonth(status);

    return {
      total,
      totalCurrentMonth,
    };
  }

  // ======= Gráfico de novos pacientes =======
  async getCharNewPatients(): Promise<any> {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const chartNewPatients: number[] = [];

    for (const month of months) {
      const total = await this.dashboardRepository.getTotalNewPatientsByMonth(
        month
      );
      chartNewPatients.push(total);
    }

    return { chartNewPatients };
  }

  async getChartAppointments(): Promise<any> {
    const statuses = [
      "SCHEDULED",
      "CONFIRMED",
      "RESCHEDULED",
      "COMPLETED",
      "CANCELED",
    ];

    const chartAppointments: number[] = [];

    for (const status of statuses) {
      const total = await this.dashboardRepository.getTotalByStatusCurrentMonth(
        status as any
      );
      chartAppointments.push(total);
    }

    return {
      chartAppointments,
    };
  }
}
