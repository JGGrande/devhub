import { z } from "zod";
import { Request, Response } from "express";
import { desenvolvedorContainer } from "../../di/desenvolvedor.container";
import { CreateDesenvolvedorUseCase } from "@modules/desenvolvedores/application/usecases/create-desenvolvedor.usecase";
import { DesenvolvedorPresenter } from "../presenters/desenvolvedor.presenter";

export class DesenvolvedorController {

  public async create(request: Request, response: Response): Promise<Response>{
    const createBodySchema = z.object({
      nivel_id: z
        .number()
        .int({ message: "O nível deve ser um número inteiro" })
        .positive({ message: "O nível deve ser um número positivo" }),
      nome: z
        .string()
        .trim()
        .min(1, { message: "O nome é obrigatório" })
        .max(255, { message: "O nome deve ter no máximo 255 caracteres" }),
      sexo: z
        .enum(["M", "F", "P"], { message: "O sexo deve ser 'M', 'F' ou 'P'" }),
      data_nascimento: z
        .string()
        .date("A data de nascimento deve ser uma data válida")
        .transform(value => new Date(value)),
      hobby: z
        .string()
        .trim()
        .min(1, { message: "O hobby é obrigatório" })
        .max(255, { message: "O hobby deve ter no máximo 255 caracteres" })
    });

    const body = createBodySchema.parse(request.body);

    const createDesenvolvedorUseCase = desenvolvedorContainer.resolve(CreateDesenvolvedorUseCase);

    const desenvolvedor = await createDesenvolvedorUseCase.execute({
      nivelId: body.nivel_id,
      dataNascimento: body.data_nascimento,
      hobby: body.hobby,
      nome: body.nome,
      sexo: body.sexo
    });

    return response
      .status(201)
      .json(DesenvolvedorPresenter.toHttpResponse(desenvolvedor));
  }

}