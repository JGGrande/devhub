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

  const minYearsOld = 16;
  const age = differenceInYears(new Date(), desenvolvedor.dataNascimento);

  if (age < minYearsOld) {
    errors.dataNascimento = `Desenvolvedor deve ter no mínimo ${minYearsOld} anos`;
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

function differenceInYears(date1: Date, date2: Date) {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}