export interface ResponseUserDTO {
  id: string;
  email: string;
  role: "ADMIN" | "PSYCHOLOGIST" | "STAFF";
  psychologistId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
