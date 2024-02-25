import { HttpClientSpy } from "../../test/mock";
import { faker } from "@faker-js/faker";
import { GetTask } from "../protocols/get-task";
import { RemoteGetTask } from "./remote-get-task";

describe("RemoteGetTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteGetTask(url, httpClientSpy);
    sut.get({} as GetTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });
});
