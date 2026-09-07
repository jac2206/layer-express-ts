import { PrismaClient } from "@prisma/client";

import { IPrismaRepository } from "./interface/prisma.repository.interface";

export class PrismaRepository implements IPrismaRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async connect(): Promise<void> {
    await this.prismaClient.$connect();
  }

  async disconnect(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  async healthCheck(): Promise<boolean> {
    await this.prismaClient.$queryRaw`SELECT 1`;
    return true;
  }
}
