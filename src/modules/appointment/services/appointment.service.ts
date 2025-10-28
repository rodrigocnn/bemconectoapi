import { notificationQueue } from "../../../jobs/notificationQueue";
import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { ResponseAppointmentDTO } from "../dtos/response-appointment.dto";
import { IAppointmentRepository } from "../repositories/appointment.repository";
import { mapToScheduledAppointment, mapToUpdatedAppointment } from "../mappers";

export class AppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async create(data: CreateAppointmentDTO): Promise<ResponseAppointmentDTO> {
    const mappedAppointment = mapToScheduledAppointment(data);

    const appointment = this.appointmentRepository.create(mappedAppointment);

    await notificationQueue.add("new-appointment", {
      patientId: data.patientId,
      psychologistId: data.psychologistId,
      date: data.start,
    });

    return appointment;
  }

  async read(psychologistId: string): Promise<ResponseAppointmentDTO[]> {
    return this.appointmentRepository.read(psychologistId);
  }

  async show(id: string): Promise<ResponseAppointmentDTO | null> {
    return this.appointmentRepository.show(id);
  }

  async update(
    id: string,
    data: CreateAppointmentDTO
  ): Promise<ResponseAppointmentDTO | null> {
    const mappedAppointment = mapToUpdatedAppointment(data);
    return this.appointmentRepository.update(id, mappedAppointment);
  }

  async delete(id: string): Promise<void> {
    return this.appointmentRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    if (!this.appointmentRepository.exists) {
      throw new Error("Method not implemented.");
    }
    return this.appointmentRepository.exists(id);
  }
}
