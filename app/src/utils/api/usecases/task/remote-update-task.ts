import { UnexpectedError } from "../../errors";
import { HttpClient, HttpStatusCode } from "../../protocols/http";
import { UpdateTask } from "../protocols/update-task";

export class RemoteUpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update(params: UpdateTask.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: params.body,
      headers: params.headers,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
