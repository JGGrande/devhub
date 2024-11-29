import { DesenvolvedorCreate } from "@/models/desenvolvedor";

export const desenvolvedorIsValidToSave = (desenvolvedor: DesenvolvedorCreate) => {
  const errors = {
    nome: "",
    sexo: "",
    nivelId: "",
    dataNascimento: "",
    hobby: "",
  };

  if (!desenvolvedor.nome.trim()) {
    errors.nome = "Nome é obrigatório";
  }

  if(desenvolvedor.nome.length > 255){
    errors.nome = "Nome deve ter no máximo 255 caracteres";
  }

  if(!desenvolvedor.nivelId) {
    errors.nivelId = "Nível é obrigatório";
  }

  if (!desenvolvedor.sexo) {
    errors.sexo = "Sexo é obrigatório";
  }

  if (!desenvolvedor.dataNascimento) {
    errors.dataNascimento = "Data de nascimento é obrigatória";
  }

  if (!desenvolvedor.hobby.trim()) {
    errors.hobby = "Hobby é obrigatório";
  }

  if(desenvolvedor.hobby.length > 255){
    errors.hobby = "Hobby deve ter no máximo 255 caracteres";
  }

  const haveSomeError = Object.values(errors).some((error) => error);

  return {
    valid: !haveSomeError,
    errors,
  }
}