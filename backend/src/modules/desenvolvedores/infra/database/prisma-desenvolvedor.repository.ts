import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@shared/infra/database/prisma";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";

@injectable()
export class PrismaDesenvolvedorRepository implements IDesenvolvedorRepository {
  private readonly prisma: PrismaClient;

  constructor(){
    this.prisma = prisma;
  }

  public async create({ nome, dataNascimento, hobby, nivelId, sexo }: CreateDesenvolvedorDto): Promise<Desenvolvedor> {
    const desenvolvedorCreated = await this.prisma.desenvolvedores.create({
      data: {
        nome,
        data_nascimento: dataNascimento,
        hobby,
        nivel_id: nivelId,
        sexo
      }
    });

    const desenvolvedor = new Desenvolvedor({
      ...desenvolvedorCreated,
      nivelId: desenvolvedorCreated.nivel_id,
      dataNascimento: desenvolvedorCreated.data_nascimento
    });

    return desenvolvedor;
  }
}