import { HttpPostClient } from "../../protocols/http";

export class RemoteTask {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async task(): Promise<void> {
    this.httpPostClient.post(this.url);
  }
}
