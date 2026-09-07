import { Router } from "express";

import { container } from "../../config/container";
import { PostController } from "../../controllers/v1/post.controller";
import {
  postIdParamsSchema,
  postResponseSchema,
  createPostSchema,
} from "../../schemas/post.schema";
import { registry } from "../../docs/registry";
import { registerRoute } from "../../docs/route-builder";
import { validate } from "../../middlewares/validate.middleware";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

registerRoute(router, registry, {
  method: "get",
  path: "/",
  swaggerPath: "/v1/posts",
  tag: "Posts",
  responseSchema: postResponseSchema,
  middlewares: [authenticateJWT],
  handler: async (req, res) => {
    const controller = container.resolve<PostController>("postController");

    return controller.getAll(req, res);
  },
});

registerRoute(router, registry, {
  method: "get",
  path: "/:id",
  swaggerPath: "/v1/posts/{id}",
  tag: "Posts",
  paramsSchema: postIdParamsSchema,
  responseSchema: postResponseSchema,
  middlewares: [
    validate({
      params: postIdParamsSchema,
    }),
    authenticateJWT,
  ],
  handler: async (req, res) => {
    const controller = container.resolve<PostController>("postController");

    return controller.getById(req, res);
  },
});

registerRoute(router, registry, {
  method: "post",
  path: "/",
  swaggerPath: "/v1/posts",
  tag: "Posts",
  bodySchema: createPostSchema,
  responseSchema: postResponseSchema,
  successStatus: 201,
  middlewares: [
    validate({
      body: createPostSchema,
    }),
    authenticateJWT,
  ],
  handler: async (req, res) => {
    const controller = container.resolve<PostController>("postController");

    return controller.create(req, res);
  },
});

export default router;
