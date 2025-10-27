import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { AppointmentStatus } from "../enums";

export function mapToScheduledAppointment(data: CreateAppointmentDTO) {
  return {
    ...data,
    status: AppointmentStatus.SCHEDULED,
    backgroundColor: "#9ca3af",
    textColor: "#fff",
    display: "block",
  };
}

export function mapToUpdatedAppointment(data: CreateAppointmentDTO) {
  let backgroundColor = "";
  let textColor = "#fff";
  let display = "block";

  switch (data.status) {
    case AppointmentStatus.SCHEDULED:
      backgroundColor = "#9ca3af"; // Agendado - cinza
      textColor = "#fff";
      break;
    case AppointmentStatus.CONFIRMED:
      backgroundColor = "#0284c7"; // Confirmado - azul
      textColor = "#fff";
      break;
    case AppointmentStatus.RESCHEDULED:
      backgroundColor = "#e6be1a"; // Aguardando Atendimento - amarelo
      textColor = "#000";
      break;
    case AppointmentStatus.COMPLETED:
      backgroundColor = "#10b981"; // Paciente Atendido - verde
      textColor = "#fff";
      break;
    case AppointmentStatus.CANCELED:
      backgroundColor = "#ef4444"; // Não Compareceu - vermelho
      textColor = "#fff";
      break;
    default:
      backgroundColor = "#9ca3af"; // fallback - cinza
      textColor = "#fff";
  }

  return {
    ...data,
    backgroundColor,
    textColor,
    display,
  };
}
