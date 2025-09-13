import { Request, Response } from "express";

import { PsychologistService } from "../services/psychologist.service";

export class PsychologistController {
  constructor(private psychologistService: PsychologistService) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const psychologist = await this.psychologistService.create(data);
      return res.status(201).json(psychologist);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar Psicologo" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const psychologists = await this.psychologistService.read();
      return res.status(200).json(psychologists);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar pacientes" });
    }
  }
}
