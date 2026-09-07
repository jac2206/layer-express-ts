import express from "express";
import { scopePerRequest } from "awilix-express";
import swaggerUi from "swagger-ui-express";
import { container } from "./config/container";
import healthRoutes from "./routes/health.routes";
import v1Router from "./routes/v1/index";
import { generateSwagger } from "./docs/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";

export const createServer = () => {
  const swaggerDoc = generateSwagger();

  swaggerDoc.components = swaggerDoc.components || {};
  swaggerDoc.components.securitySchemes = {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  };

  swaggerDoc.security = [
    {
      bearerAuth: [],
    },
  ];
  const prefix = "/layer";

  const app = express();

  app.use(express.json());

  app.use(scopePerRequest(container));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
      customSiteTitle: "Layer API Docs",
    }),
  );

  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/v1`, v1Router);

  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
      code: 404,
    });
  });

  app.use(errorMiddleware);

  return app;
};
