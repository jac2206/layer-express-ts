import type { Request, Response } from "express";

import type { PostResponseDto } from "../../dto/post/post-response.dto";
import type { IPostService } from "../../services/interface/post.service.interface";

export class PostController {
  constructor(private readonly postService: IPostService) {}

  getAll = async (_req: Request, res: Response<PostResponseDto[]>): Promise<void> => {
    const result = await this.postService.getAll();

    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response<PostResponseDto>): Promise<void> => {
    const result = await this.postService.getById(req.params.id as string);

    res.status(200).json(result);
  };

  create = async (req: Request, res: Response<PostResponseDto>): Promise<void> => {
    const result = await this.postService.create(req.body);

    res.status(201).json(result);
  };
}
