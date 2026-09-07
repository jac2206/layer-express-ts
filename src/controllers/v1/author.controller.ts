import type { Request, Response } from "express";

import type { IAuthorService } from "../../services/interface/author.service.interface";
import { AuthorResponseDto } from "../../dto/author/author-response.dto";

export class AuthorController {
  constructor(private readonly authorService: IAuthorService) {}

  getAll = async (_req: Request, res: Response<AuthorResponseDto[]>): Promise<void> => {
    const result = await this.authorService.getAll();

    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response<AuthorResponseDto>): Promise<void> => {
    const result = await this.authorService.getById(req.params.id as string);

    res.status(200).json(result);
  };

  create = async (req: Request, res: Response<AuthorResponseDto>): Promise<void> => {
    const result = await this.authorService.create(req.body);

    res.status(201).json(result);
  };
}
