import { Router } from "express";
import { NivelController } from "../controllers/nivel.controller";

const nivelRoutes = Router();
const nivelController = new NivelController()

/**
  * @openapi
  * /niveis:
  *   post:
  *     summary: Criar um novo nível
  *     description: Endpoint para criar um novo nível no sistema.
  *     tags:
  *       - Nível
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/CreateNivelRequestSchema'
  *     responses:
  *       201:
  *         description: Nível criado com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/CreateNivelResponseSchema'
  *       400:
  *         description: Corpo da requisição inválido.
  *       500:
  *         description: Erro interno do servidor.
  */
nivelRoutes.post("/", nivelController.create);

export { nivelRoutes };