import {
  HttpStatusCode,
  HttpResponse,
  HttpRequest,
  HttpClient,
} from "@/utils/api/protocols/http";

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  body?: any;
  method?: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.headers = data.headers;
    this.method = data.method;
    this.body = data.body;
    return Promise.resolve(this.response);
  }
}
