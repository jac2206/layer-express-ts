import type { CreatePostDto } from "../../dto/post/create-post.dto";
import type { PostResponseDto } from "../../dto/post/post-response.dto";

export interface IPostService {
  getAll(): Promise<PostResponseDto[]>;
  getById(id: string): Promise<PostResponseDto>;
  create(data: CreatePostDto): Promise<PostResponseDto>;
}
