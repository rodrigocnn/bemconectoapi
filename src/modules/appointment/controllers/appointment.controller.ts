import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  private appointmentParams(req: Request) {
    return {
      ...req.body,
      psychologistId: req.user!.id,
    };
  }

  async create(req: Request, res: Response) {
    try {
      const data = this.appointmentParams(req);
      const appointment = await this.appointmentService.create(data);
      return res.status(201).json(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar appointment" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const appointments = await this.appointmentService.read();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar appointments" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = this.appointmentParams(req);
      const appointment = await this.appointmentService.update(id, data);
      return res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar appointment" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.appointmentService.delete(id);
      return res
        .status(200)
        .json({ message: "Appointment excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar appointment" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.show(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment não encontrado" });
      }
      return res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar appointment" });
    }
  }
}
