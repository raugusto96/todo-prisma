import { UnexpectedError } from "../../errors";
import { HttpClient, HttpStatusCode } from "../../protocols/http";
import { DeleteTask } from "../protocols";

export class RemoteDeleteTask implements DeleteTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}
  async delete(params: DeleteTask.Params): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
      headers: {
        params: {
          taskId: params.taskId,
        },
      },
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
