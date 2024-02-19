import { HttpPostClient } from "../protocols/http";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  data?: any;

  async post(url: string, data: any): Promise<void> {
    this.url = url;
    this.data = data;
    return Promise.resolve();
  }
}
