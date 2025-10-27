import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async index(req: Request, res: Response) {
    try {
      const total = await this.dashboardService.index();
      return res.status(201).json(total);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao buscar dados para dashboard" });
    }
  }
}
