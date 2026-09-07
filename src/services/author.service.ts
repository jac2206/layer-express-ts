import { AuthorResponseDto } from "../dto/author/author-response.dto";
import type { CreateAuthorDto } from "../dto/author/create-author.dto";
import type { Author } from "../entities/author.entity";
import { DomainErrors } from "../errors/domain.errors";
import { DomainException } from "../errors/domain.exception";
import type { IAuthorRepository } from "../repositories/interface/author.repository.interface";
import type { IAuthorService } from "./interface/author.service.interface";

export class AuthorService implements IAuthorService {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async getAll(): Promise<AuthorResponseDto[]> {
    const authors = await this.authorRepository.findAll();

    return authors.map((author) => ({
      id: author.id,
      name: author.name,
      email: author.email,
      createdAt: author.createdAt,
    }));
  }

  async getById(id: string): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      const error = DomainErrors.AUTHOR_NOT_FOUND;

      throw new DomainException(error.code, error.message, error.statusCode);
    }

    return {
      id: author.id,
      name: author.name,
      email: author.email,
      createdAt: author.createdAt,
    };
  }

  async create(data: CreateAuthorDto): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.create(data);

    return {
      id: author.id,
      name: author.name,
      email: author.email,
      createdAt: author.createdAt,
    };
  }
}
