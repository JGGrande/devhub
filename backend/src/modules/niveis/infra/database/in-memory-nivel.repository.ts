import { injectable } from "inversify";
import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { INivelRepository } from "@modules/niveis/domain/repositories/nivel.repository";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";

@injectable()
export class InMemoryNivelRepository implements INivelRepository {
  private readonly niveis: Nivel[] = [];

  public async create({ nivel }: CreateNivelDto): Promise<Nivel> {
    const id = this.niveis.length + 1;

    const newNivel = new Nivel({
      id,
      nivel
    })

    this.niveis.push(newNivel);

    return newNivel;
  }
}