import { HttpClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { Task } from "@/utils/api/usecases/protocols";
import { UnexpectedError } from "@/utils/api/errors";

export class RemoteTask implements Task {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpClient<RemoteTask.Model>
  ) {}

  async task(params: Task.Params): Promise<Task.Model> {
    const httpResponse = await this.httpPostClient.request({
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

export namespace RemoteTask {
  export type Model = Task.Model;
}
