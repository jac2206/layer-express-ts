import { createServer } from "./server";
import { env } from "./config/env";
import { printEnvironmentVariables } from "./utils/env-printer";
import { logger } from "./config/logger";
import { prisma } from "./config/prisma";

async function bootstrap() {
  const app = createServer();

  const port = env.port;

  const server = app.listen(port, () => {
    logger.info(`🚀 ${env.appName} v${env.appVersion}`);
    logger.info(`🌎 Environment: ${env.nodeEnv}`);
    logger.info(`📡 Running on port ${port}`);

    if (env.showEnv) {
      printEnvironmentVariables();
    }
  });

  const shutdown = () => {
    logger.info("🛑 Shutting down gracefully...");

    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  await prisma.$disconnect();
}

bootstrap();
