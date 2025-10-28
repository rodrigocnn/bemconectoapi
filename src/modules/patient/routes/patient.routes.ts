import { Router } from "express";
import { PatientPrismaRepository } from "../repositories/patient.prisma.repository";

import { PatientController } from "../controllers/patients.controller";
import { prisma } from "../../../database/prisma.client";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import { PatientService } from "../services/patient.service";

export const patientRoutes = Router();

const patientRepository = new PatientPrismaRepository(prisma);
const pacienteservice = new PatientService(patientRepository);
const clientController = new PatientController(pacienteservice);

patientRoutes.post("/pacientes", authMiddleware, (req, res) =>
  clientController.create(req, res),
);
patientRoutes.get("/pacientes", authMiddleware, (req, res) =>
  clientController.read(req, res),
);

patientRoutes.get("/pacientes/:id", authMiddleware, (req, res) =>
  clientController.show(req, res),
);

patientRoutes.put("/pacientes/:id", authMiddleware, (req, res) =>
  clientController.update(req, res),
);

patientRoutes.delete("/pacientes/:id", authMiddleware, (req, res) =>
  clientController.delete(req, res),
);
