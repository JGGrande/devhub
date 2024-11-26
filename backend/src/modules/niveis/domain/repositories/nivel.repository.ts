import { Nivel } from "../entities/nivel";
import { FindAllNivelDto } from "@modules/niveis/application/dtos/find-all-nivel.dto";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";

export interface INivelRepository {
  create({}: CreateNivelDto): Promise<Nivel>;
  findAll({}: FindAllNivelDto): Promise<Nivel[]>;
  findById(id: number): Promise<Nivel | null>;
  exitsById(id: number): Promise<boolean>;
  count(): Promise<number>;
  update({}: Nivel): Promise<Nivel>;
  delete(id: number): Promise<void>;
}