import { Request, Response } from "express";

export class GenericController {
  constructor() {}

  getGeneric = async (_req: Request, res: Response<any>): Promise<void> => {
    res.status(200).json("status");
  };
}
