import { HttpClientSpy, mockGetParams } from "../../test/mock";
import { faker } from "@faker-js/faker";
import { GetTask } from "../protocols/get-task";
import { RemoteGetTask } from "./remote-get-task";
import { HttpStatusCode } from "../../protocols/http";
import { UnexpectedError } from "../../errors";

interface SutTypes {
  sut: RemoteGetTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteGetTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteGetTask", () => {
  test("should call HttpClient with correct url and verb", () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    sut.get({} as GetTask.Params);
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with correct headers", async () => {
    const params = mockGetParams();
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    };
    await sut.get(params);
    expect(httpClientSpy.headers).toBe(params.headers);
  });

  test("should throw UnexpectedError if HttpClient returns 404", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.get(mockGetParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.get(mockGetParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
