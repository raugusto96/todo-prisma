import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "../../test/mock";
import { RemoteUpdateTask } from "./remote-update-task";
import { UpdateTask } from "../protocols/update-task";

const makeHttpClientSpy = (): HttpClientSpy => new HttpClientSpy();

describe("RemoteUpdateTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const httpClientSpy = makeHttpClientSpy();
    const sut = new RemoteUpdateTask(url, httpClientSpy);
    sut.update({} as UpdateTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });
});
