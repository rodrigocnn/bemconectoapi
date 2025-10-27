import { CreatePsychologistDTO } from "../dtos/create-psychologist.dto";

export const psychologistData: CreatePsychologistDTO = {
  name: "Rodrigo César",
  birth: "1990-05-15",
  email: "rodrigo@gmail.com",
  cpf: "123.456.789-00",
  rg: "12.345.678-9",
  crp: "06/123456",
  password: "hashed_password",
  phone: "(11) 98765-4321",
  specialty: "Terapia Cognitivo-Comportamental",
};

export const psychologistResponse = {
  id: "dd682b13-476e-4830-9f51-60aeb3cb4e7c",
  ...psychologistData,
  password: "hashed_password",
  createdAt: "2025-08-31T18:16:54.236Z",
  updatedAt: "2025-08-31T18:16:54.236Z",
};
