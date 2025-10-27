import { Request, Response } from "express";

import { SessionService } from "../services/session.service";
import { createReservationSchema } from "../validations/create-session.schema";
import { validateReservation } from "../validations/validate-session";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  private sessionParams(req: Request) {
    return {
      ...req.body,
      psychologistId: req.user!.psychologistId,
    };
  }

  async create(req: Request, res: Response) {
    const isValid = validateReservation(createReservationSchema, req, res);
    if (!isValid) return res;

    try {
      const data = this.sessionParams(req);
      const client = await this.sessionService.create(data);

      return res.status(201).json(client);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao criar Sessão",
      });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const psychologistId = req.user!.psychologistId;
      const { idPatient } = req.params;
      const clients = await this.sessionService.read(psychologistId, idPatient);
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar reservas" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await this.sessionService.show(id);
      return res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar sessão" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = req.body;
      console.log("data", data);
      const client = await this.sessionService.update(id, data);

      return res.status(201).json(client);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar sessão" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.sessionService.delete(id);
      return res.status(200).json({ message: "Reserva excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar reserva" });
    }
  }
}
