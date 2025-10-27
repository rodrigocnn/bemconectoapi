import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { AppointmentStatus } from "../enums";

export const appointmentData: CreateAppointmentDTO = {
  start: new Date("2025-09-22T09:00:00"),
  end: new Date("2025-09-22T10:00:00"),
  status: AppointmentStatus.SCHEDULED,
  psychologistId: "e497d9ce-2614-453b-baca-4292dfdea031",
  patientId: "0a03529c-b6e2-4290-b5a9-9ed0c2445ab8",
  backgroundColor: "#9ca3af",
  textColor: "#fff",
  display: "block",
};

export const appointmentResponse = {
  id: "uuid-123",
  ...appointmentData,
  createdAt: "2025-09-27T01:08:22.646Z",
  updatedAt: "2025-09-27T01:08:22.646Z",
  deletedAt: null,
};

export const appointmentResponses = [
  { ...appointmentResponse },
  { ...appointmentResponse, id: "uuid-456" },
];
