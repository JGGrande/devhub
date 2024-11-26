import "reflect-metadata";

import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Routes } from "./routes";

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger";

import { ZodError } from "zod";
import { env } from "@shared/env";
import AppError from "@shared/errors/AppError";

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", Routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return response.status(400).json({ error: err.errors });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({ error: 'Internal server error' });
});

app.listen(env.SERVER_PORT, () => {
  console.info(`Server started on http://localhost:${env.SERVER_PORT}`);
});