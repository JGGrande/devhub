import { z } from "zod";
import { Request, Response } from "express";

import { nivelContainer } from "../../di/nivel.container";
import { CreateNivelUseCase } from "@modules/niveis/application/usecases/create-nivel.usecase";
import { NivelPresenter } from "../presenters/nivel.presenter";

export class NivelController {
  public async create(request: Request, response: Response){
    const createBodySchema = z.object({
      nivel: z
        .string()
        .trim()
        .min(1, { message: "Nível deve conter pelo menos 1 carácter." })
        .max(255, { message: "Nível não pode conter mais de 255 caracteres." })
    });

    const { nivel } = createBodySchema.parse(request.body);

    const createNivelUseCase = nivelContainer.resolve(CreateNivelUseCase);

    const nivelCreated = await createNivelUseCase.execute(nivel);

    return response.json(NivelPresenter.toHttpResponse(nivelCreated));
  }

}