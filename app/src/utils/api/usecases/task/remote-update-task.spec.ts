import { faker } from "@faker-js/faker";
import {
  HttpClientSpy,
  mockUpdateParams,
  mockUpdateResponse,
} from "@/utils/api/test/mock";
import { RemoteUpdateTask } from "./remote-update-task";
import { UpdateTask } from "@/utils/api/usecases/protocols/update-task";
import { HttpStatusCode } from "@/utils/api/protocols/http";
import { UnexpectedError } from "@/utils/api/errors";

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

  test("should call HttpClient with correct body", async () => {
    const params = mockUpdateParams();
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };
    await sut.update(params);
    expect(httpClientSpy.body).toBe(params.body);
  });

  test("should throw UnexpectedError if HttpClient returns 400", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.update(mockUpdateParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 404", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.update(mockUpdateParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.update(mockUpdateParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should return a TaskModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockUpdateResponse();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const httpResponse = await sut.update(mockUpdateParams());
    expect(httpResponse).toEqual(httpResult);
  });
});
