import { CreateSessionDTO } from "../dtos/create-session.dto";
import { ResponseSessionDTO } from "../dtos/response-session.dto";

export interface ISessionRepository {
  create(data: CreateSessionDTO): Promise<ResponseSessionDTO>;
  read(
    psychologistId: string,
    patientId: string,
  ): Promise<ResponseSessionDTO[]>;
  update(
    id: string,
    data: CreateSessionDTO,
  ): Promise<ResponseSessionDTO | null>;
  show(id: string): Promise<ResponseSessionDTO | null>;
  delete(id: string): Promise<void>;
  exists?(id: string): Promise<boolean>;
}
