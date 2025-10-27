export type DashboardEntity = "patient" | "appointment";
export type AppointmentStatus = "COMPLETED" | "CANCELED";

export interface IDashboardRepository {
  /** Total geral da entidade (ex: total de pacientes ou atendimentos) */
  getTotal(entity: DashboardEntity): Promise<number>;

  /** Total de registros criados no mês atual */
  getTotalCurrentMonth(entity: DashboardEntity): Promise<number>;

  /** Total por status — apenas para appointments */
  getTotalByStatus(status: AppointmentStatus): Promise<number>;

  /** Total por status no mês atual — apenas para appointments */
  getTotalByStatusCurrentMonth(status: AppointmentStatus): Promise<number>;

  /** Total de novos pacientes agrupados por mês (para o gráfico anual) */
  getTotalNewPatientsByMonth(month: string): Promise<number>;
}
