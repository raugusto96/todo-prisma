import { faker } from "@faker-js/faker";
import { RemoteAddTask } from "./remote-add-task";
import { HttpClientSpy } from "@/utils/api/test/mock";
import { mockTask, mockTaskModel } from "@/utils/api/test/mock/task";
import { UnexpectedError } from "@/utils/api/errors";
import { HttpStatusCode } from "@/utils/api/protocols/http";
import { AddTaskModel } from "@/utils/api/usecases/models";

const makeHttpClientSpy = () => new HttpClientSpy<AddTaskModel>();

interface SutTypes {
  sut: RemoteAddTask;
  httpClientSpy: HttpClientSpy<AddTaskModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = makeHttpClientSpy();
  const sut = new RemoteAddTask(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAddTask", () => {
  test("should call HttpClient with the correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.add(mockTask());
    expect(httpClientSpy.url).toBe(url);
  });

  test("should call HttpClient with the correct body", async () => {
    const taskParams = mockTask();
    const { sut, httpClientSpy } = makeSut();
    await sut.add(taskParams);
    expect(httpClientSpy.body).toEqual(taskParams);
  });

  test("should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockTask());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("should return a TaskModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockTaskModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const task = await sut.add(mockTask());
    expect(task).toEqual(httpResult);
  });
});
