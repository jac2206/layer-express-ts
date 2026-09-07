import type { PrismaClient } from "@prisma/client";

import type { CreateAuthorDto } from "../dto/author/create-author.dto";
import { Author } from "../entities/author.entity";
import { DomainErrors } from "../errors/domain.errors";
import { DomainException } from "../errors/domain.exception";
import { isPrismaUniqueError } from "../errors/prisma.exception";
import type { IAuthorRepository } from "./interface/author.repository.interface";

export class AuthorRepository implements IAuthorRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Author[]> {
    const authors = await this.prismaClient.author.findMany();

    return authors.map(
      (author: {
        id: string;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date | null;
      }) =>
        new Author(
          author.id,
          author.name,
          author.email,
          author.created_at,
          author.updated_at,
        ),
    );
  }

  async findById(id: string): Promise<Author | null> {
    const author = await this.prismaClient.author.findUnique({
      where: { id },
    });

    if (!author) {
      return null;
    }

    return new Author(
      author.id,
      author.name,
      author.email,
      author.created_at,
      author.updated_at,
    );
  }

  async create(data: CreateAuthorDto): Promise<Author> {
    try {
      const author = await this.prismaClient.author.create({
        data,
      });

      return new Author(
        author.id,
        author.name,
        author.email,
        author.created_at,
        author.updated_at,
      );
    } catch (error) {
      if (isPrismaUniqueError(error)) {
        const domainError = DomainErrors.AUTHOR_EMAIL_ALREADY_EXISTS;

        throw new DomainException(
          domainError.code,
          domainError.message,
          domainError.statusCode,
        );
      }

      throw error;
    }
  }
}
