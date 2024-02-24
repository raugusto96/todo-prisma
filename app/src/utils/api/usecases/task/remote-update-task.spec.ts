import { faker } from "@faker-js/faker";
import { HttpClientSpy } from "../../test/mock";
import { RemoteUpdateTask } from "./remote-update-task";
import { UpdateTask } from "../protocols/update-task";
import { HttpStatusCode } from "../../protocols/http";

const makeHttpClientSpy = (): HttpClientSpy => new HttpClientSpy();

interface SutTypes {
  sut: RemoteUpdateTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteUpdateTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteUpdateTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    sut.update({} as UpdateTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with correct body and headers", async () => {
    const params = {
      headers: {
        params: {
          taskId: faker.database.mongodbObjectId(),
        },
      },
      body: {
        message: faker.animal.bear(),
        status: faker.color.rgb(),
      },
    };
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };
    await sut.update(params);
    expect(httpClientSpy.body).toBe(params.body);
    expect(httpClientSpy.headers).toBe(params.headers);
  });
});
