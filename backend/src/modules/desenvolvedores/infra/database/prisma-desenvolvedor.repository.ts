import { injectable } from "inversify";
import { Prisma, PrismaClient, desenvolvedores as PrismaDesenvolvedor } from "@prisma/client";
import { prisma } from "@shared/infra/database/prisma";
import { IDesenvolvedorRepository } from "@modules/desenvolvedores/domain/repositories/desenvolvedor.repository";
import { CreateDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/create-desenvolvedor.dto";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";
import { FindAllDesenvolvedorDto } from "@modules/desenvolvedores/application/dtos/find-all-desenvolvedor.dto";

type PrimsDesenvolvedorWithNivel = PrismaDesenvolvedor & {
  nivel_id: number;
  nivel_nome: string;
}

@injectable()
export class PrismaDesenvolvedorRepository implements IDesenvolvedorRepository {
  private readonly prisma: PrismaClient;

  constructor() {
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

  public async findAllWithNivel({ take, skip, searchTerm }: FindAllDesenvolvedorDto): Promise<DesenvolvedorWithNivelDto[]> {
    const desenvolvedores = await this.prisma.$queryRaw<PrimsDesenvolvedorWithNivel[]>`
      SELECT
        d.id,
        d.nome,
        d.data_nascimento as "dataNascimento",
        d.hobby,
        d.sexo,
        d.nivel_id as "nivelId",
        n.id as nivel_id,
        n.nivel as nivel_nome
      FROM desenvolvedores d
      JOIN niveis n ON d.nivel_id = n.id
      ${searchTerm
        ? Prisma.sql`WHERE unaccent("nome") ILIKE unaccent('%' || ${searchTerm} || '%')`
        : Prisma.sql``
      }
      OFFSET ${skip}
      LIMIT ${take};
    `;

    const desenvolvedoresMapped = desenvolvedores.map(desenvolvedor => ({
      id: desenvolvedor.id,
      dataNascimento: desenvolvedor.data_nascimento,
      hobby: desenvolvedor.hobby,
      nome: desenvolvedor.nome,
      sexo: desenvolvedor.sexo,
      nivel: {
        id: desenvolvedor.nivel_id,
        nivel: desenvolvedor.nivel_nome
      }
    }));

    return desenvolvedoresMapped;
  }

  public async count(searchTerm?: string): Promise<number> {
    const totalDesenvolvedores = await this.prisma.$queryRaw<{ count: BigInt }[]>`
      SELECT COUNT(id)
      FROM desenvolvedores
      ${searchTerm
        ? Prisma.sql`WHERE unaccent("nome") ILIKE unaccent('%' || ${searchTerm} || '%')`
        : Prisma.sql``
      };
  `;

    return Number(totalDesenvolvedores[0].count);
  }
}