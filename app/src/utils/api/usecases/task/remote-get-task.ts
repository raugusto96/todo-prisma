import { HttpClient } from "../../protocols/http";
import { GetTask } from "../protocols/get-task";

export class RemoteGetTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get(params: GetTask.Params): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: "get",
      headers: params.headers,
    });
  }
}
