import { Router } from "express";
import { AppointmentPrismaRepository } from "../repositories/appointment.prisma.repository";
import { AppointmentController } from "../controllers/appointment.controller";
import { prisma } from "../../../database/prisma.client";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import { AppointmentService } from "../services/appointment.service";

export const appointmentRoutes = Router();

const appointmentRepository = new AppointmentPrismaRepository(prisma);
const appointmentService = new AppointmentService(appointmentRepository);
const appointmentController = new AppointmentController(appointmentService);

appointmentRoutes.post("/agenda", authMiddleware, (req, res) =>
  appointmentController.create(req, res),
);

appointmentRoutes.get("/agenda", authMiddleware, (req, res) =>
  appointmentController.read(req, res),
);

appointmentRoutes.get("/agenda/:id", authMiddleware, (req, res) =>
  appointmentController.show(req, res),
);

appointmentRoutes.put("/agenda/:id", authMiddleware, (req, res) =>
  appointmentController.update(req, res),
);
