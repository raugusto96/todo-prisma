import { UnexpectedError } from "@/utils/api/errors";
import { HttpClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { GetTask } from "@/utils/api/usecases/protocols/get-task";

export class RemoteGetTask implements GetTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetTask.Model>
  ) {}

  async get(params: GetTask.Params): Promise<GetTask.Model | GetTask.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get",
      headers: params.headers,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetTask {
  export type Model = GetTask.Model | GetTask.Model[];
}
