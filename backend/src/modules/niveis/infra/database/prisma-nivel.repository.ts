import { injectable } from "inversify";
import { Prisma, PrismaClient, niveis as PrismaNivel } from "@prisma/client";
import { prisma } from "@shared/infra/database/prisma";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { FindAllNivelDto } from "@modules/niveis/application/dtos/find-all-nivel.dto";

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

  public async findAll({ skip, take, searchTerm, orderKey, orderValue }: FindAllNivelDto): Promise<Nivel[]> {
    const niveis = await this.prisma.$queryRaw<PrismaNivel[]>`
      SELECT
        id,
        nivel
      FROM niveis
      ${
        searchTerm
          ? Prisma.sql`WHERE unaccent("nivel") ILIKE unaccent('%' || ${searchTerm} || '%')`
          : Prisma.empty
      }
      ORDER BY ${Prisma.raw(orderKey)} ${Prisma.raw(orderValue)}
      OFFSET ${skip}
      LIMIT ${take}
      ;
    `;

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

  public async exitsById(id: number): Promise<boolean> {
    const nivelExits = await this.prisma.niveis.findUnique({
      where: { id },
      select: { id: true },
    });

    return Boolean(nivelExits);
  }

  public async count(searchTerm?: string): Promise<number> {
    const totalNiveis = await this.prisma.$queryRaw<{ count: BigInt }[]>`
      SELECT COUNT(id)
      FROM niveis
      ${
        searchTerm
          ? Prisma.sql`WHERE unaccent("nivel") ILIKE unaccent('%' || ${searchTerm} || '%')`
          : Prisma.empty
      };
    `;

    return Number(totalNiveis[0].count);
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

  public async delete(id: number): Promise<void> {
    await this.prisma.niveis.delete({
      where: { id }
    });
  }
}