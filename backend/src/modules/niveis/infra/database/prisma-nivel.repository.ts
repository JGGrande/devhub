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

  public async findAll(): Promise<Nivel[]> {
    const niveis = await this.prisma.niveis.findMany();

    const niveisInstance = niveis.map(nivel => new Nivel(nivel));

    return niveisInstance;
  }

  public async findById(id: number): Promise<Nivel | null> {
    const nivel = await this.prisma.niveis.findUnique({
      where: { id }
    });

    if(!nivel){
      return null;
    }

    const nivelInstance = new Nivel(nivel);

    return nivelInstance;
  }

  public async update({ id, nivel }: Nivel): Promise<Nivel> {
    const nivelUpdated = await this.prisma.niveis.update({
      where: { id },
      data: { nivel }
    });

    const nivelInstance = new Nivel({
      id: nivelUpdated.id,
      nivel: nivelUpdated.nivel
    });

    return nivelInstance;
  }
}