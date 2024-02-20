import { HttpPostClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { TaskParams } from "@/utils/api/usecases/protocols/task";
import { UnexpectedError } from "@/utils/api/errors/unexpected-error";
import { TaskModel } from "../models/task";

export class RemoteTask {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<TaskParams, TaskModel>
  ) {}

  async task(params: TaskParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
