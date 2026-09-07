import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createPostSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().optional(),
    authorId: z.string().uuid(),
  })
  .openapi({
    example: {
      title: "My first post",
      content: "Hello world",
      authorId: "550e8400-e29b-41d4-a716-446655440000",
    },
  });

export const postIdParamsSchema = z
  .object({
    id: z.string().uuid(),
  })
  .openapi({
    example: {
      id: "550e8400-e29b-41d4-a716-446655440000",
    },
  });

export const postResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string().nullable(),
  published: z.boolean(),
  authorId: z.string().uuid(),
  createdAt: z.string().datetime(),
});
