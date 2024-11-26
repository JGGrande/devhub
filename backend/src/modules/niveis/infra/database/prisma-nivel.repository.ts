import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@shared/infra/database/prisma";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";
import { Nivel } from "@modules/niveis/domain/entities/nivel";

@injectable()
export class PrismaNivelRepository implements INivelRepository {
  private readonly prisma: PrismaClient;

  constructor(){
    this.prisma = prisma;
  }

  public async create({ nivel }: CreateNivelDto): Promise<Nivel> {
    const nivelCreated = await this.prisma.niveis.create({
      data: {
        nivel
      }
    });

    const nivelInstance = new Nivel({
      id: nivelCreated.id,
      nivel: nivelCreated.nivel
    });

    return nivelInstance;
  }

}