import { HttpClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { AddTask } from "@/utils/api/usecases/protocols";
import { UnexpectedError } from "@/utils/api/errors";

export class RemoteAddTask implements AddTask {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpClient<RemoteTask.Model>
  ) {}

  async add(params: AddTask.Params): Promise<AddTask.Model> {
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
  export type Model = AddTask.Model;
}
