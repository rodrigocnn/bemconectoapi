import { Router } from "express";
import { UserPrismaRepository } from "../repositories/user.prisma.repository";
import { prisma } from "../../../database/prisma.client";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

export const userRoutes = Router();

// Instâncias necessárias
const userRepository = new UserPrismaRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Rotas
userRoutes.post("/users", (req, res) => userController.create(req, res));

userRoutes.get("/users", (req, res) => userController.read(req, res));

userRoutes.get("/users/:id", (req, res) => userController.show(req, res));

userRoutes.put("/users/:id", (req, res) => userController.update(req, res));

userRoutes.delete("/users/:id", (req, res) => userController.delete(req, res));

export default userRoutes;
