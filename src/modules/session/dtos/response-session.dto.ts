export interface ResponseSessionDTO {
  id: string;
  psychologistId: string;
  patientId: string;
  sessionDate: Date;
  sessionDateFormatted?: string;
  summary?: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELED";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
