export interface PsychologistResponseDTO {
  id: string;
  name: string;
  birth: string;
  email: string;
  cpf: string;
  rg: string;
  crp: string;
  phone: string;
  specialty?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
