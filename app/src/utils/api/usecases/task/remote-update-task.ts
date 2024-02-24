import { HttpClient } from "../../protocols/http";
import { UpdateTask } from "../protocols/update-task";

export class RemoteUpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update(params: UpdateTask.Params): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: "put",
    });
  }
}
