import { CreateSessionDTO } from "../dtos/create-session.dto";
import { ResponseSessionDTO } from "../dtos/response-session.dto";
import { ISessionRepository } from "../repositories/session.repository";

export class SessionService {
  constructor(private sessionRepository: ISessionRepository) {}

  async create(data: CreateSessionDTO): Promise<ResponseSessionDTO> {
    return this.sessionRepository.create(data);
  }

  async read(
    psychologistId: string,
    patientId: string,
  ): Promise<ResponseSessionDTO[]> {
    return this.sessionRepository.read(psychologistId, patientId);
  }

  async show(id: string): Promise<ResponseSessionDTO | null> {
    return this.sessionRepository.show(id);
  }

  async update(
    id: string,
    data: CreateSessionDTO,
  ): Promise<ResponseSessionDTO | null> {
    return this.sessionRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.sessionRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    if (!this.sessionRepository.exists) {
      throw new Error("Method not implemented.");
    }
    return this.sessionRepository.exists(id)!;
  }
}
