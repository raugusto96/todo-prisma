import {
  HttpPostClient,
  HttpPostParams,
  HttpStatusCode,
  HttpResponse,
} from "@/utils/api/protocols/http";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: any;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
