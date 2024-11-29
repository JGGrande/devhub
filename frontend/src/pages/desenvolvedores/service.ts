import { PaginatedContent } from "@/@types/pagination";
import { DesenolvedorResponse, Desenvolvedor, DesenvolvedorCreate, DesenvolvedorUpdate } from "@/models/desenvolvedor";
import { Nivel } from "@/models/niveis";
import HttpClient from "@/services/http.service";

class DesenvolvedorService {

  public async findAllNiveis(): Promise<PaginatedContent<Nivel>> {
    const { data } = await HttpClient.get('/niveis?limit=999');

    return data;
  }

  public async findAll(page: number, searchTerm?: string): Promise<PaginatedContent<Desenvolvedor>> {
    const params = {
      page: String(page),
      searchTerm,
      limit: String(15),
    }

    const { data } = await HttpClient.get("/desenvolvedores", { params });

    const desenolvedoresMapped = (data as PaginatedContent<DesenolvedorResponse>).data.map((desenvolvedor) => ({
      ...desenvolvedor,
      dataNascimento: new Date(desenvolvedor.data_nascimento),
    }));

    return {
      ...data,
      data: desenolvedoresMapped,
    };
  }

  public async create(desenvolvedor: DesenvolvedorCreate): Promise<void> {
    const desenvolvedorMapped = {
      ...desenvolvedor,
      nivel_id: desenvolvedor.nivelId,
      data_nascimento: desenvolvedor.dataNascimento.toISOString().split("T")[0],
    }

    await HttpClient.post("/desenvolvedores", desenvolvedorMapped);
  }

  public async update(desenvolvedor: DesenvolvedorUpdate){
    const dataNascimentoWithoutTime = desenvolvedor.dataNascimento.toISOString().split('T')[0];

    const desenvolvedorMapped = {
      nome: desenvolvedor.nome,
      nivel_id: desenvolvedor.nivelId,
      data_nascimento: dataNascimentoWithoutTime,
      hobby: desenvolvedor.hobby,
      sexo: desenvolvedor.sexo
    }

    await HttpClient.put(`/desenvolvedores/${desenvolvedor.id}`, desenvolvedorMapped);
  }

  public async delete(id: number): Promise<void> {
    await HttpClient.delete(`/desenvolvedores/${id}`);
  }

}

export default new DesenvolvedorService();