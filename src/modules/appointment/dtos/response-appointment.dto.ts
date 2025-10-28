export interface ResponseAppointmentDTO {
  id: string;
  start: Date;
  end: Date;
  status: string;
  backgroundColor: string;
  textColor: string;
  display: string;
  psychologistId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
