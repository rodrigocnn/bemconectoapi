export interface ResponseLoginDTO {
  id: string;
  email: string;
  role: string;
  password?: string;
  token: string;
  psychologistId: string;
  expiresIn?: string;
}

export interface LoginDataDefault {
  id: string;
  email: string;
  password: string;
  role: string;
  psychologistId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
