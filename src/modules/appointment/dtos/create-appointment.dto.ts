export interface CreateAppointmentDTO {
  start: Date;
  end: Date;
  status?: "PENDING" | "CONFIRMED" | "RESCHEDULED" | "CANCELED";
  psychologistId: string;
  patientId: string;
}
