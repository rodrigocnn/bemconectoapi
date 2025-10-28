import { CreatePatientDTO } from "../dtos/create-patient.dto";

import { ResponsePatientDTO } from "../dtos/response-patient.dto";

export interface IPatientRepository {
  create(data: CreatePatientDTO): Promise<ResponsePatientDTO>;
  read(psychologistId: string): Promise<ResponsePatientDTO[]>;
  update(
    id: string,
    data: CreatePatientDTO
  ): Promise<ResponsePatientDTO | null>;
  show(id: string): Promise<ResponsePatientDTO | null>;
  delete(id: string): Promise<void>;
  exists?(id: string): Promise<boolean>;
  emailAlreadyExist?(email: string): Promise<boolean>;
}
