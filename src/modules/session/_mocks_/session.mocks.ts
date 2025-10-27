import { CreateSessionDTO } from "../dtos/create-session.dto";

export const sessionData: CreateSessionDTO = {
  psychologistId: "11111111-1111-1111-1111-111111111111",
  patientId: "22222222-2222-2222-2222-222222222222",
  sessionDate: new Date(),
  summary: "Patient reported improvement in mood and reduced anxiety.",
  behavioralObservations: "Calm, engaged, cooperative.",
  interventions: "Cognitive restructuring, relaxation techniques.",
  patientReactions: "Responded positively to interventions.",
  referrals: "None at this time.",
  therapeuticPlans: "Continue weekly sessions focusing on coping strategies.",
  diagnosticHypotheses: "Generalized Anxiety Disorder.",
  techniqueUsed: "CBT",
  status: "SCHEDULED",
};
