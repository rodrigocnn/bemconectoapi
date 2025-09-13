import { CreateAppointmentDTO } from "../dtos/create-appointment.dto";
import { ResponseAppointmentDTO } from "../dtos/response-appointment.dto";

export interface IAppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<ResponseAppointmentDTO>;
  read(): Promise<ResponseAppointmentDTO[]>;
  update(
    id: string,
    data: CreateAppointmentDTO
  ): Promise<ResponseAppointmentDTO | null>;
  show(id: string): Promise<ResponseAppointmentDTO | null>;
  delete(id: string): Promise<void>;
  exists?(id: string): Promise<boolean>;
}
