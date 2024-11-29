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
  *       - in: query
  *         name: orderKey
  *         required: false
  *         description: Chave de ordenação
  *         schema:
  *           type: string
  *           enum: [id, nome, sexo, data_nascimento, hobby, nivel_nome]
  *           example: id
  *       - in: query
  *         name: orderValue
  *         required: false
  *         description: Valor de ordenação
  *         schema:
  *           type: string
  *           enum: [ASC, DESC]
  *           example: ASC
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

/**
  * @openapi
  * /desenvolvedores/{id}:
  *   put:
  *     summary: Alterar um desenvolvedor
  *     description: Endpoint para alterar desenvolvedor no sistema.
  *     tags:
  *       - Desenvolvedor
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
  *             $ref: '#/components/schemas/UpdateDesenvolvedorRequestSchema'
  *     responses:
  *       200:
  *         description: desenvolvedor atualizado retornado com sucesso.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/DesenvolvedorSchema'
  *       404:
  *         description: Desenvolvedor não encontrado.
  *       500:
  *         description: Erro interno do servidor.
  */
desenvolvedorRoutes.put("/:id", desenvolvedorController.update);

/**
  * @openapi
  * /desenvolvedores/{id}:
  *   delete:
  *     summary: Deletar um desenvolvedor
  *     description: Endpoint para deletar desenvolvedor no sistema.
  *     tags:
  *       - Desenvolvedor
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       204:
  *         description: Desenvolvedor deletado com sucesso.
  *       404:
  *         description: Desenvolvedor não encontrado.
  *       500:
  *         description: Erro interno do servidor.
  */
desenvolvedorRoutes.delete("/:id", desenvolvedorController.delete);

export { desenvolvedorRoutes };