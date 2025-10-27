import { CreateSessionDTO } from "../dtos/create-session.dto";

export const sessionData: CreateSessionDTO = {
  psychologistId: "e497d9ce-2614-453b-baca-4292dfdea031",
  patientId: "0a03529c-b6e2-4290-b5a9-9ed0c2445ab8",
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
