export interface CreateLoginDTO {
  id: string;
  email: string;
  password: string;
  role: string;
  psychologistId: string | null;
}
