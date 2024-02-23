import { HttpClient } from "../../protocols/http";
import { DeleteTask } from "../protocols";

export class RemoteDeleteTask implements DeleteTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}
  async delete(params: DeleteTask.Params): Promise<void> {
    const httpResponse = this.httpClient.request({
      url: this.url,
      method: "delete",
    });
  }
}
