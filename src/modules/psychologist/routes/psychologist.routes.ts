import { Router } from "express";
import { PsychologistPrismaRepository } from "../repositories/psychologist.prisma.repository";

import { prisma } from "../../../database/prisma.client";
import { PsychologistController } from "../controllers/psychologist.controller";
import { PsychologistService } from "../services/psychologist.service";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import { authorize } from "../../../shared/middlewares/authorize";

export const psychologistsRoutes = Router();

const psychologistRepository = new PsychologistPrismaRepository(prisma);
const psychologistService = new PsychologistService(psychologistRepository);
const psychologistController = new PsychologistController(psychologistService);

psychologistsRoutes.post("/psicologos", (req, res) =>
  psychologistController.create(req, res)
);
psychologistsRoutes.get(
  "/psicologos",
  authMiddleware,
  authorize(["ADMIN"]),
  (req, res) => psychologistController.read(req, res)
);

psychologistsRoutes.get(
  "/psicologos/:id",
  authMiddleware,
  //authorize(["ADMIN"]),
  (req, res) => psychologistController.show(req, res)
);

export default psychologistsRoutes;
