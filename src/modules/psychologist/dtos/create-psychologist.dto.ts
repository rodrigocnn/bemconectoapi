export interface CreatePsychologistDTO {
  name: string;
  birth: string;
  email: string;
  cpf: string;
  rg: string;
  crp: string;
  password: string;
  phone: string;
  specialty?: string;
}
