import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createAuthorSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
  })
  .openapi({
    example: {
      name: "Juan",
      email: "juan@example.com",
    },
  });

export const authorIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const authorResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
