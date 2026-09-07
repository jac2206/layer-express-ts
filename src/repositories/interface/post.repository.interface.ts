import type { CreatePostDto } from "../../dto/post/create-post.dto";
import type { Post } from "../../entities/post.entity";

export interface IPostRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  create(data: CreatePostDto): Promise<Post>;
}
