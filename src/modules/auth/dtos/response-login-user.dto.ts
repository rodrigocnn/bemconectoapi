export interface ResponseLoginDTO {
  id: string;
  email: string;
  role: string;
  password?: string;
  token: string;
  psychologistId: string;
  expiresIn: string;
}
