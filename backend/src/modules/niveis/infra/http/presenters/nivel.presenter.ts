import { Nivel } from "@modules/niveis/domain/entities/nivel";

export class NivelPresenter {
  static toHttpResponse(nivel: Nivel) {
    return {
      id: nivel.id,
      nivel: nivel.nivel
    };
  };

  static fromArrayToHttpResponse(niveis: Nivel[]){
    return niveis.map(nivel => ({
      id: nivel.id,
      nivel: nivel.nivel
    }));
  }
}