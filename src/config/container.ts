import { createContainer, asClass, asValue, InjectionMode, asFunction } from "awilix";

import { prisma } from "./prisma";
import { HealthService } from "../services/health.service";
import { HealthController } from "../controllers/health.controller";
import { GenericController } from "../controllers/v1/generic.controller";
import { PrismaRepository } from "../repositories/prisma.repository";
import { AuthorRepository } from "../repositories/author.repository";
import { PostRepository } from "../repositories/post.repository";
import { AuthorService } from "../services/author.service";
import { PostService } from "../services/post.service";
import { AuthorController } from "../controllers/v1/author.controller";
import { PostController } from "../controllers/v1/post.controller";
import { JwtAuthService } from "../security/jwt-auth.service";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // Infra
  prismaClient: asFunction(() => prisma).singleton(),
  prismaRepository: asClass(PrismaRepository).singleton(),

  authorRepository: asClass(AuthorRepository).scoped(),
  postRepository: asClass(PostRepository).scoped(),

  // Service
  healthService: asClass(HealthService).scoped(),
  authorService: asClass(AuthorService).scoped(),
  postService: asClass(PostService).scoped(),
  authService: asClass(JwtAuthService).scoped(),

  // Controller
  healthController: asClass(HealthController).scoped(),
  genericController: asClass(GenericController).scoped(),
  authorController: asClass(AuthorController).scoped(),
  postController: asClass(PostController).scoped(),
});
