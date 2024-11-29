import { z } from "zod";
import { Request, Response } from "express";
import { desenvolvedorContainer } from "../../di/desenvolvedor.container";
import { CreateDesenvolvedorUseCase } from "@modules/desenvolvedores/application/usecases/create-desenvolvedor.usecase";
import { DesenvolvedorPresenter } from "../presenters/desenvolvedor.presenter";
import { FindAllDesenvolvedorUseCase } from "@modules/desenvolvedores/application/usecases/find-all-desenvolvedor.usecase";
import { UpdateDesenvolvedorUseCase } from "@modules/desenvolvedores/application/usecases/update-desenvolvedor.usecase";
import { DeleteDesenvolvedorUseCase } from "@modules/desenvolvedores/application/usecases/delete-desenvolvedor.usecase";

export class DesenvolvedorController {

  public async create(request: Request, response: Response): Promise<Response> {
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

  public async findAll(request: Request, response: Response): Promise<Response> {
    const findAllQuerySchema = z.object({
      page: z
        .number({
          coerce: true,
          message: "Página deve ser um número."
        })
        .int({ message: "Página deve ser um número inteiro." })
        .positive({ message: "Página deve ser um número positivo." })
        .optional()
        .default(1),
      limit: z
        .number({
          coerce: true,
          message: "Limite deve ser um número."
        })
        .int({ message: "Limit deve ser um número inteiro." })
        .positive({ message: "Limite deve ser um número positivo." })
        .optional()
        .default(25),
      searchTerm: z
        .string({ message: "Termo de busca deve ser uma string." })
        .trim()
        .min(1, { message: "Termo de busca deve conter pelo menos 1 carácter." })
        .max(255, { message: "Termo de busca não pode conter mais de 255 caracteres." })
        .optional(),
      orderKey: z
        .enum(["id", "nome", "sexo", "data_nascimento", "hobby", "nivel_nome"])
        .optional()
        .default("id"),
      orderValue: z
        .enum(["ASC", "DESC"])
        .optional()
        .default("ASC")
    });

    const { page, limit, searchTerm, orderKey, orderValue } = findAllQuerySchema.parse(request.query);

    const findAllDesenvolvedorUseCase = desenvolvedorContainer.resolve(FindAllDesenvolvedorUseCase);

    const desenvolvedores = await findAllDesenvolvedorUseCase.execute({
      page,
      limit,
      searchTerm,
      orderKey,
      orderValue
    });

    return response.json(DesenvolvedorPresenter.fromArrayToHttpResponse(desenvolvedores));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateBodySchema = z.object({
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

    const body = updateBodySchema.parse(request.body);

    const updateParamsSchema = z.object({
      id: z
        .number({
          coerce: true,
          message: "ID deve ser um número."
        })
        .int({ message: "ID deve ser um número inteiro." })
        .positive({ message: "ID deve ser um número positivo." })
    });

    const { id } = updateParamsSchema.parse(request.params);

    const updateDesenvolvedorUseCase = desenvolvedorContainer.resolve(UpdateDesenvolvedorUseCase);

    const desenvolvedorUpdated = await updateDesenvolvedorUseCase.execute({
      id,
      nivelId: body.nivel_id,
      dataNascimento: body.data_nascimento,
      hobby: body.hobby,
      nome: body.nome,
      sexo: body.sexo
    });

    return response.json(DesenvolvedorPresenter.toHttpResponse(desenvolvedorUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteParamsSchema = z.object({
      id: z
        .number({
          coerce: true,
          message: "ID deve ser um número."
        })
        .int({ message: "ID deve ser um número inteiro." })
        .positive({ message: "ID deve ser um número positivo." })
    });

    const { id } = deleteParamsSchema.parse(request.params);

    const deleteDesenvolvedorUseCase = desenvolvedorContainer.resolve(DeleteDesenvolvedorUseCase);

    await deleteDesenvolvedorUseCase.execute(id);

    return response.sendStatus(204);
  }

}