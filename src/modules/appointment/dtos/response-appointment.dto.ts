export interface ResponseAppointmentDTO {
  id: string;
  start: Date;
  end: Date;
  status: "PENDING" | "CONFIRMED" | "RESCHEDULED" | "CANCELED";
  psychologistId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
