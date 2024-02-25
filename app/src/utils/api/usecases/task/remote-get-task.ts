import { UnexpectedError } from "../../errors";
import { HttpClient, HttpStatusCode } from "../../protocols/http";
import { GetTask } from "../protocols/get-task";

export class RemoteGetTask implements GetTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
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
