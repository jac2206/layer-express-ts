import type { PrismaClient } from "@prisma/client";

import type { CreatePostDto } from "../dto/post/create-post.dto";
import { Post } from "../entities/post.entity";
import type { IPostRepository } from "./interface/post.repository.interface";

export class PostRepository implements IPostRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.prismaClient.post.findMany();

    return posts.map(
      (post: {
        id: string;
        title: string;
        content: string | null;
        published: boolean;
        authorId: string;
        created_at: Date;
        updated_at: Date | null;
      }) =>
        new Post(
          post.id,
          post.title,
          post.content,
          post.published,
          post.authorId,
          post.created_at,
          post.updated_at,
        ),
    );
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.prismaClient.post.findUnique({
      where: { id },
    });

    if (!post) {
      return null;
    }

    return new Post(
      post.id,
      post.title,
      post.content,
      post.published,
      post.authorId,
      post.created_at,
      post.updated_at,
    );
  }

  async create(data: CreatePostDto): Promise<Post> {
    const post = await this.prismaClient.post.create({
      data,
    });

    return new Post(
      post.id,
      post.title,
      post.content,
      post.published,
      post.authorId,
      post.created_at,
      post.updated_at,
    );
  }
}
