import { Nivel } from "@modules/niveis/domain/entities/nivel";

export type FindAllNivelDto = {
  skip: number;
  take: number;
  searchTerm?: string;
  orderKey: keyof Nivel;
  orderValue: 'ASC' | 'DESC';
}