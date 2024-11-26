import { Nivel } from "../entities/nivel";
import { CreateNivelDto } from "@modules/niveis/application/dtos/create-nivel.dto";

export interface INivelRepository {
  create({}: CreateNivelDto): Promise<Nivel>;
}