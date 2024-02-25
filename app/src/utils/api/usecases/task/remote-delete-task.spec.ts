import { faker } from "@faker-js/faker";
import { HttpClientSpy, mockDeleteParams } from "../../test/mock";
import { RemoteDeleteTask } from "./remote-delete-task";
import { HttpStatusCode } from "../../protocols/http";
import { UnexpectedError } from "../../errors";

const makeHttpClientSpy = () => new HttpClientSpy();

interface SutTypes {
  sut: RemoteDeleteTask;
  httpClientSpy: HttpClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteDeleteTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteDeleteTask", () => {
  test("should call HttpClient with the correct url and verb", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    await sut.delete(mockDeleteParams());
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with the headers params", async () => {
    const params = mockDeleteParams();
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    await sut.delete(params);
    expect(httpClientSpy.headers.params).toEqual(params);
  });

  test("should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.delete(mockDeleteParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 404", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.delete(mockDeleteParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.delete(mockDeleteParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should return null if HttpClient returns 204 ", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
      body: null,
    };
    const task = await sut.delete(mockDeleteParams());
    expect(task).toBeNull();
  });
});