export interface CreateUserDTO {
  email: string;
  password: string;
  role: "ADMIN" | "PSYCHOLOGIST" | "STAFF";
  psychologistId?: string;
}
