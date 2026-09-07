import type { CreateAuthorDto } from "../../dto/author/create-author.dto";
import type { Author } from "../../entities/author.entity";

export interface IAuthorRepository {
  findAll(): Promise<Author[]>;
  findById(id: string): Promise<Author | null>;
  create(data: CreateAuthorDto): Promise<Author>;
}
