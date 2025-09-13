import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { ResponseAppointmentDTO } from "../dtos/response-appointment.dto";
import { IAppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async create(data: CreateAppointmentDTO): Promise<ResponseAppointmentDTO> {
    return this.appointmentRepository.create(data);
  }

  async read(): Promise<ResponseAppointmentDTO[]> {
    return this.appointmentRepository.read();
  }

  async show(id: string): Promise<ResponseAppointmentDTO | null> {
    return this.appointmentRepository.show(id);
  }

  async update(
    id: string,
    data: CreateAppointmentDTO
  ): Promise<ResponseAppointmentDTO | null> {
    return this.appointmentRepository.update(id, data);
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
