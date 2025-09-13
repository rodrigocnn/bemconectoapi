import { CreatePsychologistDTO } from "../dtos/create-psychologist.dto";
import { PsychologistResponseDTO } from "../dtos/response-psychologist.dto";

export interface IPsychologistRepository {
  create(data: CreatePsychologistDTO): Promise<PsychologistResponseDTO>;
  findByEmail(email: string): Promise<PsychologistResponseDTO>;
  read(): Promise<PsychologistResponseDTO[]>;
}
