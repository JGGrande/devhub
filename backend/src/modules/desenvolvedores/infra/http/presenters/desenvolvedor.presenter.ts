import { DesenvolvedorWithNivelDto } from "@modules/desenvolvedores/application/dtos/desenvolvedor-with-nivel.dto";
import { Desenvolvedor } from "@modules/desenvolvedores/domain/entities/desenvolvedor.entity";
import { PaginatedContent } from "@shared/@types/pagination";

export class DesenvolvedorPresenter {
  static toHttpResponse(desenvolvedor: Desenvolvedor){
    return {
      id: desenvolvedor.id,
      nome: desenvolvedor.nome,
      nivel_id: desenvolvedor.nivelId,
      data_nascimento: desenvolvedor.dataNascimento,
      sexo: desenvolvedor.sexo,
      hobby: desenvolvedor.hobby
    };
  }

  static fromArrayToHttpResponse({ data, meta }: PaginatedContent<DesenvolvedorWithNivelDto>){
    return {
      data: data.map(desenvolvedor => ({
        id: desenvolvedor.id,
        nome: desenvolvedor.nome,
        sexo: desenvolvedor.sexo,
        data_nascimento: desenvolvedor.dataNascimento,
        idade: getAgeByDate(desenvolvedor.dataNascimento),
        hobby: desenvolvedor.hobby,
        nivel: desenvolvedor.nivel
      })),
      meta
    }
  }
}

function getAgeByDate(date: Date){
  const today = new Date();

  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();

  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}