import { HttpPostClient } from "@/utils/api/protocols/http";
import { TaskParams } from "@/utils/api/usecases/protocols/task";

export class RemoteTask {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async task(params: TaskParams): Promise<void> {
    this.httpPostClient.post({
      url: this.url,
      body: params,
    });
  }
}
