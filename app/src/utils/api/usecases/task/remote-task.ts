import { HttpPostClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { Task, TaskParams } from "@/utils/api/usecases/protocols";
import { UnexpectedError } from "@/utils/api/errors";
import { TaskModel } from "../models";

export class RemoteTask implements Task {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<TaskParams, TaskModel>
  ) {}

  async task(params: TaskParams): Promise<TaskModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
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
