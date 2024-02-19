import { HttpPostClient } from "./protocols/http/http-post-client";
import { RemoteTask } from "./remote-task";

describe("Http Client", () => {
  test("should call HttpPostClient with the correct url", async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = "any_url";
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteTask(url, httpPostClientSpy);
    await sut.task();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
