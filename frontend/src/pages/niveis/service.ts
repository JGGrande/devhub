import { PaginatedContent } from "@/@types/pagination";
import { Nivel } from "@/models/niveis";
import HttpClient from "@/services/http.service";

class NivelService {

  public async findAll(page: number, searchTerm?: string): Promise<PaginatedContent<Nivel>>{
    const params: Record<string, string> = {
      page: String(page),
      limit: String(15),
    };

    if(searchTerm){
      params['searchTerm'] = searchTerm;
    }

    const { data } = await HttpClient.get('/niveis', { params });

    return data
  }
}

export default new NivelService();