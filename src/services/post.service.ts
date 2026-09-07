import type { CreatePostDto } from "../dto/post/create-post.dto";
import type { PostResponseDto } from "../dto/post/post-response.dto";
import { DomainErrors } from "../errors/domain.errors";
import { DomainException } from "../errors/domain.exception";
import type { IPostRepository } from "../repositories/interface/post.repository.interface";
import type { IPostService } from "./interface/post.service.interface";

export class PostService implements IPostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async getAll(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.findAll();

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
      createdAt: post.createdAt,
    }));
  }

  async getById(id: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      const error = DomainErrors.POST_NOT_FOUND;

      throw new DomainException(error.code, error.message, error.statusCode);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
      createdAt: post.createdAt,
    };
  }

  async create(data: CreatePostDto): Promise<PostResponseDto> {
    const post = await this.postRepository.create(data);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
      createdAt: post.createdAt,
    };
  }
}
