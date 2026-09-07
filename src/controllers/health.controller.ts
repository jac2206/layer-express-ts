import { Request, Response } from "express";

import { IHealthService } from "../services/interface/health.service.interface";

export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

  getHealth = async (_req: Request, res: Response<any>): Promise<void> => {
    const status = await this.healthService.getStatus();
    res.status(200).json(status);
  };
}
