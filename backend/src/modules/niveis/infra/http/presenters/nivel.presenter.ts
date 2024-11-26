import { Nivel } from "@modules/niveis/domain/entities/nivel";
import { PaginatedContent } from "@shared/@types/pagination";

export class NivelPresenter {
  static toHttpResponse(nivel: Nivel) {
    return {
      id: nivel.id,
      nivel: nivel.nivel
    };
  };

  static fromArrayToHttpResponse({ data, meta }: PaginatedContent<Nivel>){
    return {
      data: data.map(nivel => ({
        id: nivel.id,
        nivel: nivel.nivel
      })),
      meta
    }
  }
}