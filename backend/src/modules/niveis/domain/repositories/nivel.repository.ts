import { Nivel } from "../entities/nivel";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";

export interface INivelRepository {
  create({}: CreateNivelDto): Promise<Nivel>;
  findAll(): Promise<Nivel[]>;
  findById(id: number): Promise<Nivel | null>;
  exitsById(id: number): Promise<boolean>;
  update({}: Nivel): Promise<Nivel>;
  delete(id: number): Promise<void>;
}