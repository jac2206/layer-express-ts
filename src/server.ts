import express from "express";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import healthRoutes from "./routes/health.routes";
import v1Router from "./routes/v1/index"

export const createServer = () => {

  const prefix = "/layer";

  const app = express();

  app.use(express.json());

  app.use(scopePerRequest(container));

  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/v1`, v1Router);

  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
      code: 404
    });
  });

  return app;
};
