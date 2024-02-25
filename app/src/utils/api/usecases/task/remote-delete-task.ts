import { UnexpectedError } from "@/utils/api/errors";
import { HttpClient, HttpStatusCode } from "@/utils/api/protocols/http";
import { DeleteTask } from "@/utils/api/usecases/protocols";

export class RemoteDeleteTask implements DeleteTask {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}
  async delete(): Promise<null> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "delete",
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent:
        return httpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}
