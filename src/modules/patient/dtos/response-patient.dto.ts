export interface ResponsePatientDTO {
  id: string;
  psychologistId: string; // necessário para multitenancy
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  birthDateFormatted?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
