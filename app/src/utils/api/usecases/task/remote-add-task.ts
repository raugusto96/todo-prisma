import { HttpClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { AddTask } from "@/utils/api/usecases/protocols";
import { UnexpectedError } from "@/utils/api/errors";

export class RemoteAddTask implements AddTask {
  /**
   * @url URL da requisição
   * @httpClient Adapter responsável por encapsular a lib/ferramenta que irá executar a requisição
   */
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddTask.Model>
  ) {}

  async add(params: AddTask.Params): Promise<AddTask.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddTask {
  export type Model = AddTask.Model;
}
