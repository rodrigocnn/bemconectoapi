import { Router } from "express";

import { prisma } from "../../../database/prisma.client";

import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import { DashboardController } from "../controllers/dashboard.controller";
import { DashboardPrismaRepository } from "../repositories/dashboard.prisma.repository";
import { DashboardService } from "../services/dashboard.service";

export const dashboardRoutes = Router();

const dashboardRepository = new DashboardPrismaRepository(prisma);
const dashboardService = new DashboardService(dashboardRepository);
const dashboardController = new DashboardController(dashboardService);

dashboardRoutes.get("/dashboard", authMiddleware, (req, res) =>
  dashboardController.index(req, res),
);
