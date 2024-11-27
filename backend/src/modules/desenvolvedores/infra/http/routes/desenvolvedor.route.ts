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

/**
  * @openapi
  * /desenvolvedores:
  *   get:
  *     summary: Listar todos os desenvolvedores
  *     description: Endpoint para listar todos os desenvolvedores no sistema.
  *     tags:
  *       - Desenvolvedor
  *     parameters:
  *       - in: query
  *         name: page
  *         required: false
  *         description: Página do conteúdo desejado
  *         schema:
  *           type: integer
  *           example: 1
  *       - in: query
  *         name: limit
  *         required: false
  *         description: Limite de conteúdo por página
  *         schema:
  *           type: integer
  *           example: 25
  *       - in: query
  *         name: searchTerm
  *         required: false
  *         description: Termo de busca
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Lista de desenvolvedores retornada com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/FindAllDesenvolvedorResponseSchema'
  *       404:
  *         description: Nenhum nível cadastrado.
  *       500:
  *         description: Erro interno do servidor.
  */
desenvolvedorRoutes.get("/", desenvolvedorController.findAll);

export { desenvolvedorRoutes };