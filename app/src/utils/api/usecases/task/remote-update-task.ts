import { UnexpectedError } from "../../errors";
import { HttpClient, HttpStatusCode } from "../../protocols/http";
import { UpdateTask } from "../protocols/update-task";

export class RemoteUpdateTask implements UpdateTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteUpdateTask.Model>
  ) {}

  async update(params: UpdateTask.Params): Promise<UpdateTask.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "put",
      body: params.body,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteUpdateTask {
  export type Model = UpdateTask.Model;
}
