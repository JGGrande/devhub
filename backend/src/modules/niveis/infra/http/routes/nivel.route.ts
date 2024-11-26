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
  *               $ref: '#/components/schemas/NivelSchema'
  *       400:
  *         description: Corpo da requisição inválido.
  *       500:
  *         description: Erro interno do servidor.
  */
nivelRoutes.post("/", nivelController.create);

/**
  * @openapi
  * /niveis:
  *   get:
  *     summary: Listar todos os níveis
  *     description: Endpoint para listar todos os níveis no sistema.
  *     tags:
  *       - Nível
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
  *     responses:
  *       200:
  *         description: Lista de níveis retornada com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/NivelSchema'
  *       404:
  *         description: Nenhum nível cadastrado.
  *       500:
  *         description: Erro interno do servidor.
  */
nivelRoutes.get("/", nivelController.findAll);

/**
  * @openapi
  * /niveis/{id}:
  *   put:
  *     summary: Alterar um nível
  *     description: Endpoint para alterar nível no sistema.
  *     tags:
  *       - Nível
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateNivelRequestSchema'
  *     responses:
  *       200:
  *         description: nível atualizado retornado com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/NivelSchema'
  *       404:
  *         description: Nível não encontrado.
  *       500:
  *         description: Erro interno do servidor.
  */
nivelRoutes.put("/:id", nivelController.update);

/**
  * @openapi
  * /niveis/{id}:
  *   delete:
  *     summary: Deletar um nível
  *     description: Endpoint para deletar nível no sistema.
  *     tags:
  *       - Nível
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Nível deletado com sucesso.
  *       404:
  *         description: Nível não encontrado.
  *       500:
  *         description: Erro interno do servidor.
  */

nivelRoutes.delete("/:id", nivelController.delete);

export { nivelRoutes };