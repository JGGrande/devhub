import { PaginatedContent } from "@/@types/pagination";
import { DesenolvedorResponse, Desenvolvedor, DesenvolvedorCreate, DesenvolvedorUpdate } from "@/models/desenvolvedor";
import { Nivel } from "@/models/niveis";
import HttpClient from "@/services/http.service";

export type DesenvolvedorKeysToOrder = keyof Omit<Desenvolvedor, "nivelId" | "dataNascimento"> | 'nivel_nome' | 'data_nascimento';

class DesenvolvedorService {

  public async findAllNiveis(): Promise<PaginatedContent<Nivel>> {
    const { data } = await HttpClient.get('/niveis?limit=999');

    return data;
  }

  public async findAll(page: number, searchTerm?: string, orderKey?: DesenvolvedorKeysToOrder, orderValue?: "ASC" | "DESC"): Promise<PaginatedContent<Desenvolvedor>> {
    const params: Record<string, string> = {
      page: String(page),
      limit: String(15)
    }

    if (orderKey && orderValue) {
      params['orderKey'] = orderKey;
      params['orderValue'] = orderValue;
    }

    if (searchTerm) {
      params['searchTerm'] = searchTerm;
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