import { z } from "zod";
import { Request, Response } from "express";

import { nivelContainer } from "../../di/nivel.container";
import { CreateNivelUseCase } from "@modules/niveis/application/usecases/create-nivel.usecase";
import { NivelPresenter } from "../presenters/nivel.presenter";
import { FindAllNivelUseCase } from "@modules/niveis/application/usecases/find-all-nivel.usecase";
import { UpdateNivelUseCase } from "@modules/niveis/application/usecases/update-nivel.usecase";

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
    const findAllNivelUseCase = nivelContainer.resolve(FindAllNivelUseCase);

    const niveis = await findAllNivelUseCase.execute();

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

}