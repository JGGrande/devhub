import { PaginatedContent } from "@/@types/pagination";
import { Nivel } from "@/models/niveis";
import HttpClient from "@/services/http.service";

class NivelService {

  public async findAll(page: number, searchTerm?: string, orderKey?: keyof Nivel, orderValue?: "ASC" | "DESC"): Promise<PaginatedContent<Nivel>>{
    const params: Record<string, string> = {
      page: String(page),
      limit: String(15),
    };

    if(orderKey && orderValue){
      params['orderKey'] = orderKey;
      params['orderValue'] = orderValue;
    }

    if(searchTerm){
      params['searchTerm'] = searchTerm;
    }

    const { data } = await HttpClient.get('/niveis', { params });

    return data
  }

  public async create(nivel: string): Promise<Nivel>{
    const { data } = await HttpClient.post('/niveis', { nivel });

    return data;
  }

  public async update(nivel: Nivel): Promise<Nivel>{
    const { data } = await HttpClient.put(`/niveis/${nivel.id}`, { nivel: nivel.nivel });

    return data;
  }

  public async delete(id: number){
    await HttpClient.delete(`/niveis/${id}`);
  }
}

export default new NivelService();