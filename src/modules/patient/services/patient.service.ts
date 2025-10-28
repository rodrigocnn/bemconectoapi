import { validateCPF } from "../../../shared/utils";
import { CreatePatientDTO } from "../dtos/create-patient.dto";
import { ResponsePatientDTO } from "../dtos/response-patient.dto";
import { IPatientRepository } from "../repositories/patient.repository";

export class PatientService {
  constructor(private patientRepository: IPatientRepository) {}

  async create(data: CreatePatientDTO): Promise<ResponsePatientDTO> {
    if (data.cpf) {
      validateCPF(data.cpf);
    }

    const emailExists = await this.emailAlreadyExist(data.email);
    if (emailExists) {
      throw new Error("E-mail already registered");
    }

    return this.patientRepository.create(data);
  }

  async read(psychologistId: string): Promise<ResponsePatientDTO[]> {
    return this.patientRepository.read(psychologistId);
  }

  async show(id: string): Promise<ResponsePatientDTO | null> {
    return this.patientRepository.show(id);
  }
  async update(
    id: string,
    data: CreatePatientDTO
  ): Promise<ResponsePatientDTO> {
    const currentPatient = await this.patientRepository.show(id);
    if (!currentPatient) {
      throw new Error("Paciente nao encontrado");
    }

    if (data.cpf) {
      validateCPF(data.cpf);
    }

    if (data.email && data.email !== currentPatient.email) {
      const emailExists = await this.emailAlreadyExist(data.email);
      if (emailExists) {
        throw new Error("E-mail already registered");
      }
    }

    return this.patientRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.patientRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    if (!this.patientRepository.exists) {
      throw new Error("Method not implemented.");
    }
    return this.patientRepository.exists(id)!;
  }

  async emailAlreadyExist(email: string): Promise<boolean> {
    const exists = await this.patientRepository.emailAlreadyExist(email);
    if (exists) {
      throw new Error("Este email já está sendo usado");
    }
    return false;
  }
}
