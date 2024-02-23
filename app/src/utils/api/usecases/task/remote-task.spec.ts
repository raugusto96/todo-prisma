import { faker } from "@faker-js/faker";
import { RemoteTask } from "./remote-task";
import { HttpClientSpy } from "@/utils/api/test/mock";
import { mockTask, mockTaskModel } from "@/utils/api/test/mock/task";
import { UnexpectedError } from "@/utils/api/errors";
import { HttpStatusCode } from "@/utils/api/protocols/http";
import { TaskModel } from "../models";

const makeHttpClientSpy = () => new HttpClientSpy<TaskModel>();

interface SutTypes {
  sut: RemoteTask;
  httpClientSpy: HttpClientSpy<TaskModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteTask", () => {
  test("should call HttpClient with the correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.task(mockTask());
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with the correct body", async () => {
    const taskParams = mockTask();
    const { sut, httpClientSpy } = makeSut();
    await sut.task(taskParams);
    expect(httpClientSpy.body).toEqual(taskParams);
  });

  test("should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.task(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.task(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.task(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should return a TaskModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockTaskModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const task = await sut.task(mockTask());
    expect(task).toEqual(httpResult);
  });
});
