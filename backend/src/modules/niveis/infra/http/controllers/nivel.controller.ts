import { z } from "zod";
import { Request, Response } from "express";

import { nivelContainer } from "../../di/nivel.container";
import { CreateNivelUseCase } from "@modules/niveis/application/usecases/create-nivel.usecase";
import { NivelPresenter } from "../presenters/nivel.presenter";
import { FindAllNivelUseCase } from "@modules/niveis/application/usecases/find-all-nivel.usecase";
import { UpdateNivelUseCase } from "@modules/niveis/application/usecases/update-nivel.usecase";
import { DeleteNivelUseCase } from "@modules/niveis/application/usecases/delete-nivel.usecase";

export class NivelController {
  public async create(request: Request, response: Response): Promise<Response>{
    const createBodySchema = z.object({
      nivel: z
        .string({ message: "Nível deve ser uma string." })
        .trim()
        .min(1, { message: "Nível deve conter pelo menos 1 carácter." })
        .max(255, { message: "Nível não pode conter mais de 255 caracteres." })
    });

    const { nivel } = createBodySchema.parse(request.body);

    const createNivelUseCase = nivelContainer.resolve(CreateNivelUseCase);

    const nivelCreated = await createNivelUseCase.execute(nivel);

    return response
      .status(201)
      .json(NivelPresenter.toHttpResponse(nivelCreated));
  }

  public async findAll(request: Request, response: Response): Promise<Response>{
    const findAllQuerySchema = z.object({
      page: z
        .number({
          coerce: true,
          message: "Página deve ser um número."
        })
        .int({ message: "Página deve ser um número inteiro." })
        .positive({  message: "Página deve ser um número positivo." })
        .optional()
        .default(1),
      limit: z
        .number({
          coerce: true,
          message: "Limite deve ser um número."
        })
        .int({ message: "Limit deve ser um número inteiro." })
        .positive({  message: "Limite deve ser um número positivo." })
        .optional()
        .default(25),
      searchTerm: z
        .string({ message: "Termo de busca deve ser uma string." })
        .trim()
        .min(1, { message: "Termo de busca deve conter pelo menos 1 carácter." })
        .max(255, { message: "Termo de busca não pode conter mais de 255 caracteres." })
        .optional()
    });

    const { page, limit, searchTerm } = findAllQuerySchema.parse(request.query);

    const findAllNivelUseCase = nivelContainer.resolve(FindAllNivelUseCase);

    const niveis = await findAllNivelUseCase.execute({
      page,
      limit,
      searchTerm
    });

    return response.json(NivelPresenter.fromArrayToHttpResponse(niveis));
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const updateParamsSchema = z.object({
      id: z
        .number({
          coerce: true,
          message: "ID deve ser um número."
        })
        .int({ message: "ID deve ser um número inteiro." })
        .positive({  message: "ID deve ser um número positivo." })
    });

    const { id } = updateParamsSchema.parse(request.params);

    const updateBodySchema = z.object({
      nivel: z
        .string({ message: "Nível deve ser uma string." })
        .trim()
        .min(1, { message: "Nível deve conter pelo menos 1 carácter." })
        .max(255, { message: "Nível não pode conter mais de 255 caracteres." })
    });

    const { nivel } = updateBodySchema.parse(request.body);

    const updateNivelUseCase = nivelContainer.resolve(UpdateNivelUseCase);

    const nivelUpdated = await updateNivelUseCase.execute(id, nivel);

    return response.json(NivelPresenter.toHttpResponse(nivelUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const deleteParamsSchema = z.object({
      id: z
        .number({
          coerce: true,
          message: "ID deve ser um número."
        })
        .int({ message: "ID deve ser um número inteiro." })
        .positive({  message: "ID deve ser um número positivo." })
    });

    const { id } = deleteParamsSchema.parse(request.params);

    const deleteNivelUseCase = nivelContainer.resolve(DeleteNivelUseCase);

    await deleteNivelUseCase.execute(id);

    const noContentStatusCode = 204;

    return response.sendStatus(noContentStatusCode);
  }

}