import { Router } from "express";
import { DesenvolvedorController } from "../controllers/desenvolvedor.controller";

const desenvolvedorRoutes = Router();
const desenvolvedorController = new DesenvolvedorController();

/**
  * @openapi
  * /desenvolvedores:
  *   post:
  *     summary: Criar um novo desenvolvedor
  *     description: Endpoint para criar um novo desenvolvedor no sistema.
  *     tags:
  *       - Desenvolvedor
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/CreateDesenvolvedorRequestSchema'
  *     responses:
  *       201:
  *         description: Desenvolvedor criado com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/DesenvolvedorSchema'
  *       400:
  *         description: Corpo da requisição inválido.
  *       500:
  *         description: Erro interno do servidor.
  */
desenvolvedorRoutes.post("/", desenvolvedorController.create);

export { desenvolvedorRoutes };