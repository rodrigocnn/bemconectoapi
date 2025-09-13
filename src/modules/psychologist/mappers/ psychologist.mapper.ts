import { Psychologist } from "../../../../prisma/generated/prisma";
import { PsychologistResponseDTO } from "../dtos/response-psychologist.dto";

export class PsychologistMapper {
  static toDTO(entity: Psychologist): PsychologistResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      birth: entity.birth,
      email: entity.email,
      cpf: entity.cpf,
      rg: entity.rg,
      crp: entity.crp,
      phone: entity.phone,
      specialty: entity.specialty ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
  static toDTOs(entities: Psychologist[]): PsychologistResponseDTO[] {
    return entities.map(this.toDTO);
  }
}
