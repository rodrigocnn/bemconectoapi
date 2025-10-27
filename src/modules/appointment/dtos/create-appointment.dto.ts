import { AppointmentStatus } from "../enums";

export interface CreateAppointmentDTO {
  start: Date;
  end: Date;
  status?: AppointmentStatus; // <- usa o enum do Prisma aqui
  psychologistId: string;
  patientId: string;
  backgroundColor: string;
  textColor: string;
  display: string;
}
