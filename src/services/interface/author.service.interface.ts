import { AuthorResponseDto } from "../../dto/author/author-response.dto";
import type { CreateAuthorDto } from "../../dto/author/create-author.dto";

export interface IAuthorService {
  getAll(): Promise<AuthorResponseDto[]>;
  getById(id: string): Promise<AuthorResponseDto>;
  create(data: CreateAuthorDto): Promise<AuthorResponseDto>;
}
