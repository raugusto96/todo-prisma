import { HttpPostClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { Task, TaskParams } from "@/utils/api/usecases/protocols/task";
import { UnexpectedError } from "@/utils/api/errors/unexpected-error";
import { TaskModel } from "../models/task";

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
