import { PaginatedContent } from "@/@types/pagination";
import { DesenolvedorResponse, Desenvolvedor } from "@/models/desenvolvedor";
import HttpClient from "@/services/http.service";

class DesenvolvedorService {

  public async findAll(page: number, searchTerm?: string): Promise<PaginatedContent<Desenvolvedor>> {
    const params = {
      page: String(page),
      searchTerm,
      limit: String(15),
    }

    const { data } = await HttpClient.get("/desenvolvedores", { params });

    const desenolvedoresMapped = (data as PaginatedContent<DesenolvedorResponse>).data.map((desenvolvedor) => ({
      ...desenvolvedor,
      dataNascimento: new Date(desenvolvedor.dataNascimento),
    }));

    return {
      ...data,
      data: desenolvedoresMapped,
    };
  }
}

export default new DesenvolvedorService();