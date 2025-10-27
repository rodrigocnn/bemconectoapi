import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";

export class PatientController {
  constructor(private patientService: PatientService) {}

  private patientParams(req: Request) {
    return {
      ...req.body,
      psychologistId: req.user!.psychologistId,
    };
  }

  async create(req: Request, res: Response) {
    try {
      const data = this.patientParams(req);
      const client = await this.patientService.create(data);
      return res.status(201).json(client);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: String(error) });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const psychologistId = req.user!.psychologistId;
      const patients = await this.patientService.read(psychologistId);
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar pacientes" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await this.patientService.show(id);
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar paciente" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = this.patientParams(req);
      const client = await this.patientService.update(id, data);
      return res.status(201).json(client);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(500).json({ message: String(error) });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.patientService.delete(id);
      return res.status(200).json({ message: "paciente excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar paciente" });
    }
  }
}
