import { Prisma, PrismaClient } from "@prisma/client";
import { env } from "@shared/env";

const logLevel: Prisma.LogLevel[] = env.NODE_ENV === "production" || env.NODE_ENV === "stage"
  ? ["error", "warn"]
  : ["error", "warn", "info", "query"];

const prisma = new PrismaClient({
  log: logLevel
});

export { prisma };