import { Router } from "express";

import { container } from "../../config/container";
import { AuthorController } from "../../controllers/v1/author.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticateJWT } from "../../middlewares/auth.middleware";

import {
  authorIdParamsSchema,
  authorResponseSchema,
  createAuthorSchema,
} from "../../schemas/author.schema";
import { registerRoute } from "../../docs/route-builder";
import { registry } from "../../docs/registry";

const router = Router();

registerRoute(router, registry, {
  method: "get",
  path: "/",
  swaggerPath: "/v1/authors",
  tag: "Authors",
  responseSchema: authorResponseSchema,
  handler: async (req, res) => {
    const controller = container.resolve<AuthorController>("authorController");

    return controller.getAll(req, res);
  },
});

registerRoute(router, registry, {
  method: "get",
  path: "/:id",
  swaggerPath: "/v1/authors/{id}",
  tag: "Authors",
  paramsSchema: authorIdParamsSchema,
  responseSchema: authorResponseSchema,
  middlewares: [
    validate({
      params: authorIdParamsSchema,
    }),
    authenticateJWT,
  ],
  isProtected: true,
  handler: async (req, res) => {
    const controller = container.resolve<AuthorController>("authorController");

    return controller.getById(req, res);
  },
});

registerRoute(router, registry, {
  method: "post",
  path: "/",
  swaggerPath: "/v1/authors",
  tag: "Authors",
  bodySchema: createAuthorSchema,
  responseSchema: authorResponseSchema,
  successStatus: 201,
  middlewares: [
    validate({
      body: createAuthorSchema,
    }),
    authenticateJWT,
  ],
  isProtected: true,
  handler: async (req, res) => {
    const controller = container.resolve<AuthorController>("authorController");

    return controller.create(req, res);
  },
});

export default router;
