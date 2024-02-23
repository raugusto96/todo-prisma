import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "../../test/mock";
import { RemoteDeleteTask } from "./remote-delete-task";

const makeHttpClientSpy = () => new HttpClientSpy();

describe("RemoteDeleteTask", () => {
  test("should call HttpClient with the correct url and verb", async () => {
    const url = faker.internet.url();
    const httpClientSpy = makeHttpClientSpy();
    const sut = new RemoteDeleteTask(url, httpClientSpy);
    const taskId = faker.database.mongodbObjectId();
    await sut.delete({ taskId });
    expect(httpClientSpy.url).toBe(url);
  });
});
