import { Router } from "express";
import { patientRoutes } from "../../modules/patient/routes/patient.routes";
import { appointmentRoutes } from "../../modules/appointment/routes/appointment.routes";
import psychologistsRoutes from "../../modules/psychologist/routes/psychologist.routes";
import authRoutes from "../../modules/auth/routes/auth.routes";
import userRoutes from "../../modules/user/routes/user.routes";

export const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(psychologistsRoutes);
router.use(patientRoutes);
router.use(appointmentRoutes);
